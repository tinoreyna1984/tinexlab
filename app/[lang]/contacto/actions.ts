"use server";

import sgMail from "@sendgrid/mail";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(0),
});

export type ContactState = {
  status: "idle" | "success" | "validation" | "error";
  messageKey?: "success" | "error";
  fieldErrors?: Partial<Record<"name" | "email" | "message", "required" | "invalidEmail">>;
};

export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: String(formData.get("website") ?? ""),
  };

  if (typeof raw.website === "string" && raw.website.length > 0) {
    return { status: "success", messageKey: "success" };
  }

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "message") {
        fieldErrors[field] = "required";
      } else if (field === "email") {
        fieldErrors.email = issue.code === "invalid_format" ? "invalidEmail" : "required";
      }
    }
    return { status: "validation", fieldErrors };
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.SENDGRID_TO_EMAIL;
  const from = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("SendGrid is not configured: missing server environment variables.");
    return { status: "error", messageKey: "error" };
  }

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send({
      to,
      from,
      replyTo: result.data.email,
      subject: `Tinexlab: mensaje de ${result.data.name}`,
      text: `Nombre: ${result.data.name}\nCorreo: ${result.data.email}\n\n${result.data.message}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(result.data.name)}</p><p><strong>Correo:</strong> ${escapeHtml(result.data.email)}</p><p>${escapeHtml(result.data.message).replace(/\n/g, "<br />")}</p>`,
    });
    return { status: "success", messageKey: "success" };
  } catch (error) {
    console.error("SendGrid delivery failed", error instanceof Error ? error.message : "unknown error");
    return { status: "error", messageKey: "error" };
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}
