function adminBookingNotification({
  name,
  phone,
  date,
  bookingId,
  slot,
  totalPrice,
  courtName,
}) {
  return `
  <div style="
  margin:0; 
  padding:40px 20px; 
  background:#f8faf9;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
">
  
  <div style="
    max-width:600px;
    margin:0 auto;
    background:#FFFFFF;
    border-radius:16px;
    box-shadow:0 2px 8px rgba(0,0,0,0.04);
    overflow:hidden;
  ">
    
    <!-- Top Border -->
    <div style="background:#2563eb; height:3px;"></div>

    <!-- Header -->
    <div style="padding:48px 40px 36px; text-align:center;">
      
      <div style="
        width:56px;
        height:56px;
        background:#eff6ff;
        border-radius:50%;
        margin:0 auto 20px;
        line-height:56px;
        font-size:28px;
      ">💰</div>
      
      <h1 style="
        font-size:28px;
        font-weight:600;
        margin:0 0 8px;
        color:#111827;
        letter-spacing:-0.5px;
      ">New Payment Received</h1>
      
      <p style="
        color:#6b7280;
        font-size:15px;
        margin:0;
        font-weight:400;
      ">A new booking has been confirmed and paid.</p>
      
    </div>

    <!-- Content -->
    <div style="padding:0 40px 48px;">
      
      <!-- Customer Information -->
      <h3 style="font-size:14px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Customer Details</h3>
      <div style="
        background:#fafafa;
        border-radius:12px;
        padding:20px;
        margin-bottom:24px;
      ">
        <div style="margin-bottom:12px;">
          <div style="font-size:12px; color:#9ca3af;">Name</div>
          <div style="font-size:16px; color:#1f2937; font-weight:600;">${name}</div>
        </div>
        <div>
          <div style="font-size:12px; color:#9ca3af;">Mobile Number</div>
          <div style="font-size:16px; color:#1f2937; font-weight:600;">${phone || "Not provided"}</div>
        </div>
      </div>

      <!-- Booking Details -->
      <h3 style="font-size:14px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Booking Details</h3>
      <div style="
        background:#fafafa;
        border-radius:12px;
        padding:20px;
        margin-bottom:24px;
      ">
        <div style="padding:8px 0; border-bottom:1px solid #eee;">
          <span style="color:#6b7280;">Date:</span>
          <span style="float:right; color:#1f2937; font-weight:600;">${date}</span>
        </div>
        <div style="padding:8px 0; border-bottom:1px solid #eee;">
          <span style="color:#6b7280;">Time Slot:</span>
          <span style="float:right; color:#1f2937; font-weight:600;">${slot}</span>
        </div>
        <div style="padding:8px 0; border-bottom:1px solid #eee;">
          <span style="color:#6b7280;">Court:</span>
          <span style="float:right; color:#1f2937; font-weight:600;">${courtName}</span>
        </div>
        <div style="padding:8px 0;">
          <span style="color:#6b7280;">Booking ID:</span>
          <span style="float:right; color:#1f2937; font-weight:600; font-size:12px;">${bookingId}</span>
        </div>
      </div>

      <!-- Payment Amount -->
      <div style="
        background:#2563eb;
        border-radius:12px;
        padding:20px;
        text-align:center;
      ">
        <div style="font-size:12px; color:rgba(255,255,255,0.8); text-transform:uppercase; margin-bottom:4px;">Amount Received</div>
        <div style="font-size:32px; color:#FFFFFF; font-weight:700;">₹${totalPrice}</div>
      </div>

    </div>

    <!-- Footer -->
    <div style="
      background:#fafafa;
      padding:20px 40px;
      text-align:center;
      border-top:1px solid #e5e7eb;
    ">
      <p style="font-size:12px; color:#9ca3af; margin:0;">
        This is an automated notification from KaviKanna Booking System.
      </p>
    </div>

  </div>
  
</div>
  `;
}

module.exports = { adminBookingNotification };
