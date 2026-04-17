function membershipConfirmationEmail({
  name,
  startDate,
  endDate,
  conflicts = [],
  membershipId,
  slot,
  basePrice,
  platformFee,
  totalPrice,
  courtName,
}) {
  const conflictsHtml =
    conflicts.length > 0
      ? `<div style="margin-top:16px; padding:12px; background:#fff7ed; border-radius:8px; border:1px solid #fed7aa;">
          <strong style="color:#9a3412; font-size:14px;">⚠️ Note: Skipped Bookings</strong>
          <p style="color:#c2410c; font-size:13px; margin:4px 0 0;">The following dates were already booked by others and were skipped: <br/>${conflicts.join(", ")}</p>
         </div>`
      : "";

  return `
    <div style="margin:0; padding:40px 20px; background:#f0fdf4; font-family: sans-serif;">
      <div style="max-width:600px; margin:0 auto; background:#FFFFFF; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
        <div style="background:#16a34a; height:6px;"></div>
        <div style="padding:48px 40px; text-align:center;">
          <div style="width:64px; height:64px; background:#dcfce7; border-radius:50%; margin:0 auto 24px; line-height:64px; font-size:32px;">✨</div>
          <h1 style="font-size:28px; font-weight:700; color:#111827; margin:0 0 12px;">Membership Active!</h1>
          <p style="color:#4b5563; font-size:16px; margin:0;">Hi ${name}, welcome to the KaviKanna family!</p>
        </div>
        <div style="padding:0 40px 48px;">
          <div style="background:#f9fafb; border-radius:12px; padding:24px; margin-bottom:24px; border:1px solid #f3f4f6;">
            <div style="margin-bottom:16px;">
              <span style="font-size:12px; color:#9ca3af; text-transform:uppercase; font-weight:600; letter-spacing:1px;">Membership ID</span>
              <div style="font-size:16px; color:#1f2937; font-weight:700;">${membershipId}</div>
            </div>
            <hr style="border:0; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:#6b7280;">Court:</span>
              <strong style="color:#111827;">${courtName}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:#6b7280;">Time Slot:</span>
              <strong style="color:#111827;">${slot}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:#6b7280;">Duration:</span>
              <strong style="color:#111827;">${startDate} to ${endDate || "N/A"}</strong>
            </div>
          </div>
          ${conflictsHtml}
          <div style="background:#16a34a; border-radius:12px; padding:20px; text-align:center; color:#FFFFFF;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span style="color:rgba(255,255,255,0.8); font-size:13px;">Base Price:</span>
              <span style="color:#FFFFFF; font-weight:600;">₹${basePrice}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:rgba(255,255,255,0.8); font-size:13px;">Platform Fee:</span>
              <span style="color:#FFFFFF; font-weight:600;">₹${platformFee}</span>
            </div>
            <div style="height:1px; background:rgba(255,255,255,0.2); margin-bottom:12px;"></div>
            <div style="font-size:12px; opacity:0.9; text-transform:uppercase; margin-bottom:4px;">Total Paid</div>
            <div style="font-size:32px; font-weight:800;">₹${totalPrice}</div>
          </div>
        </div>
        <div style="background:#f9fafb; padding:32px 40px; text-align:center; border-top:1px solid #e5e7eb;">
          <p style="font-size:14px; color:#6b7280; margin:0 0 16px;">We look forward to seeing you on the court!</p>
          <a href="https://maps.app.goo.gl/Yc8HyNEKd4ccfFMA8" style="background:#16a34a; color:#FFFFFF; text-decoration:none; padding:12px 24px; border-radius:8px; font-weight:600; display:inline-block;">📍 Get Directions</a>
        </div>
      </div>
    </div>
    `;
}

/**
 * Template for Admin Notification (Sent to Admin)
 */
function adminMembershipNotification({
  name,
  phone,
  startDate,
  endDate,
  conflicts = [],
  membershipId,
  slot,
  basePrice,
  platformFee,
  totalPrice,
  courtName,
}) {
  const conflictsHtml =
    conflicts.length > 0
      ? `<div style="margin-top:16px; padding:12px; background:#fef2f2; border-radius:8px; border:1px solid #fecaca; margin-bottom:24px;">
          <strong style="color:#991b1b; font-size:14px;">🚨 Booking Conflicts Detected</strong>
          <p style="color:#b91c1c; font-size:13px; margin:4px 0 0;">These dates were already booked and were NOT blocked for this member: <br/>${conflicts.join(", ")}</p>
         </div>`
      : "";

  return `
    <div style="margin:0; padding:40px 20px; background:#f8faf9; font-family: sans-serif;">
      <div style="max-width:600px; margin:0 auto; background:#FFFFFF; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
        <div style="background:#2563eb; height:6px;"></div>
        <div style="padding:40px; text-align:center;">
          <div style="width:64px; height:64px; background:#eff6ff; border-radius:50%; margin:0 auto 24px; line-height:64px; font-size:32px;">🏆</div>
          <h1 style="font-size:24px; font-weight:700; color:#111827; margin:0;">New Membership Payment</h1>
        </div>
        <div style="padding:0 40px 40px;">
          <h3 style="font-size:13px; color:#9ca3af; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Customer Details</h3>
          <div style="background:#f9fafb; border-radius:12px; padding:20px; margin-bottom:24px;">
            <div style="margin-bottom:10px;"><span style="color:#6b7280;">Name:</span> <strong style="color:#111827;">${name}</strong></div>
            <div><span style="color:#6b7280;">Phone:</span> <strong style="color:#111827;">${phone}</strong></div>
          </div>
          <h3 style="font-size:13px; color:#9ca3af; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Membership Details</h3>
          <div style="background:#f9fafb; border-radius:12px; padding:20px; margin-bottom:24px;">
            <div style="margin-bottom:10px;"><span style="color:#6b7280;">ID:</span> <strong style="color:#111827;">${membershipId}</strong></div>
            <div style="margin-bottom:10px;"><span style="color:#6b7280;">Court:</span> <strong style="color:#111827;">${courtName}</strong></div>
            <div style="margin-bottom:10px;"><span style="color:#6b7280;">Slot:</span> <strong style="color:#111827;">${slot}</strong></div>
            <div><span style="color:#6b7280;">Duration:</span> <strong style="color:#111827;">${startDate} to ${endDate || "N/A"}</strong></div>
          </div>
          ${conflictsHtml}
          <div style="background:#2563eb; border-radius:12px; padding:20px; text-align:center; color:#FFFFFF;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span style="color:rgba(255,255,255,0.8); font-size:12px;">Base Price:</span>
              <span style="color:#FFFFFF; font-weight:600;">₹${basePrice}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:rgba(255,255,255,0.8); font-size:12px;">Platform Fee:</span>
              <span style="color:#FFFFFF; font-weight:600;">₹${platformFee}</span>
            </div>
            <div style="height:1px; background:rgba(255,255,255,0.2); margin-bottom:12px;"></div>
            <div style="font-size:12px; opacity:0.9; text-transform:uppercase; margin-bottom:4px;">Total Amount Received</div>
            <div style="font-size:32px; font-weight:800;">₹${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
    `;
}

module.exports = { membershipConfirmationEmail, adminMembershipNotification };
