function bookingConfirmationEmail({
  name,
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
    <div style="background:#16a34a; height:3px;"></div>

    <!-- Header -->
    <div style="padding:48px 40px 36px; text-align:center;">
      
      <div style="
        width:56px;
        height:56px;
        background:#ecfdf5;
        border-radius:50%;
        margin:0 auto 20px;
        line-height:56px;
        font-size:28px;
      ">✓</div>
      
      <h1 style="
        font-size:28px;
        font-weight:600;
        margin:0 0 8px;
        color:#111827;
        letter-spacing:-0.5px;
      ">Booking Confirmed</h1>
      
      <p style="
        color:#6b7280;
        font-size:15px;
        margin:0;
        font-weight:400;
      ">Hi ${name}, your court is ready!</p>
      
    </div>

    <!-- Content -->
    <div style="padding:0 40px 48px;">
      
      <!-- Details Box -->
      <div style="
        background:#fafafa;
        border-radius:12px;
        padding:24px;
        margin-bottom:24px;
      ">
        
        <!-- Date -->
        <div style="padding:12px 0; display:flex; align-items:flex-start;">
          <span style="font-size:20px; margin-right:12px; display:inline-block; width:28px;">📅</span>
          <div style="flex:1;">
            <div style="
              font-size:11px; 
              color:#9ca3af; 
              font-weight:500; 
              text-transform:uppercase; 
              letter-spacing:0.5px;
              margin-bottom:4px;
            ">Date</div>
            <div style="font-size:15px; color:#1f2937; font-weight:600;">${date}</div>
          </div>
        </div>

        <div style="height:1px; background:#e5e7eb; margin:12px 0;"></div>

        <!-- Booking ID -->
        <div style="padding:12px 0; display:flex; align-items:flex-start;">
          <span style="font-size:20px; margin-right:12px; display:inline-block; width:28px; flex-shrink:0;">🎫</span>
          <div style="flex:1; min-width:0;">
            <div style="
              font-size:11px; 
              color:#9ca3af; 
              font-weight:500; 
              text-transform:uppercase; 
              letter-spacing:0.5px;
              margin-bottom:4px;
            ">Booking ID</div>
            <div style="font-size:15px; color:#1f2937; font-weight:600; word-wrap:break-word; overflow-wrap:break-word;">${bookingId}</div>
          </div>
        </div>

        <div style="height:1px; background:#e5e7eb; margin:12px 0;"></div>

        <!-- Time -->
        <div style="padding:12px 0; display:flex; align-items:flex-start;">
          <span style="font-size:20px; margin-right:12px; display:inline-block; width:28px; flex-shrink:0;">⏰</span>
          <div style="flex:1; min-width:0;">
            <div style="
              font-size:11px; 
              color:#9ca3af; 
              font-weight:500; 
              text-transform:uppercase; 
              letter-spacing:0.5px;
              margin-bottom:4px;
            ">Time</div>
            <div style="font-size:15px; color:#1f2937; font-weight:600; word-wrap:break-word; overflow-wrap:break-word;">${slot}</div>
          </div>
        </div>

        <div style="height:1px; background:#e5e7eb; margin:12px 0;"></div>

        <!-- Court -->
        <div style="padding:12px 0 0; display:flex; align-items:flex-start;">
          <span style="font-size:20px; margin-right:12px; display:inline-block; width:28px;">🏸</span>
          <div style="flex:1;">
            <div style="
              font-size:11px; 
              color:#9ca3af; 
              font-weight:500; 
              text-transform:uppercase; 
              letter-spacing:0.5px;
              margin-bottom:4px;
            ">Court</div>
            <div style="font-size:15px; color:#1f2937; font-weight:600;">${courtName}</div>
          </div>
        </div>

      </div>

      <!-- Price -->
      <div style="
        background:#16a34a;
        border-radius:12px;
        padding:24px;
        text-align:center;
        margin-bottom:32px;
      ">
        <div style="
          font-size:11px; 
          color:rgba(255,255,255,0.8); 
          font-weight:500; 
          text-transform:uppercase; 
          letter-spacing:1px; 
          margin-bottom:8px;
        ">Total Amount</div>
        <div style="
          font-size:36px; 
          color:#FFFFFF; 
          font-weight:700; 
          letter-spacing:-1px;
        ">₹${totalPrice}</div>
      </div>

      <!-- Guidelines -->
      <div style="
        border-top:1px solid #e5e7eb;
        padding-top:28px;
        margin-top:8px;
      ">
        
        <h3 style="
          font-size:16px;
          font-weight:600;
          margin:0 0 20px;
          color:#374151;
        ">Court Guidelines</h3>

        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • Maximum 8 members per court
        </div>
        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • Non-marking shoes only
        </div>
        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • Keep the court clean
        </div>
        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • No food or drinks on the court
        </div>
        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • Respect other players
        </div>
        <div style="padding:6px 0; color:#6b7280; font-size:14px; line-height:1.6;">
          • Use only shuttles provided
        </div>

      </div>

      <!-- Notice -->
      <div style="margin-top:24px;">
        <div style="
          background:#fffbeb;
          border-left:3px solid #fbbf24;
          border-radius:8px;
          padding:16px 20px;
        ">
          <p style="
            font-size:14px;
            color:#92400e;
            margin:0;
            line-height:1.6;
          ">
            Please arrive 10 minutes early. Have a great game! 🏆
          </p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="
      background:#fafafa;
      padding:28px 40px;
      text-align:center;
      border-top:1px solid #e5e7eb;
    ">
      
      <p style="
        font-size:15px;
        color:#374151;
        margin:0 0 8px;
        font-weight:600;
      ">KaviKanna Badminton Court</p>
      
      <p style="
        font-size:13px;
        color:#6b7280;
        margin:0 0 16px;
        line-height:1.6;
      ">
        <p style="color:#16a34a; text-decoration:none; font-weight:500;">
          Near Puthumaraiamman Koil, B. Mutlur,Bhuvanagiri Taluk<br/>
          Cuddalore District - 608601
        </p>
      </p>

      <a href="https://maps.app.goo.gl/Yc8HyNEKd4ccfFMA8" target="_blank" style="
        display:inline-block;
        background:#16a34a;
        color:#FFFFFF;
        text-decoration:none;
        padding:10px 24px;
        border-radius:8px;
        font-size:14px;
        font-weight:600;
        margin-bottom:16px;
      ">📍 Get Directions</a>

      <p style="font-size:13px; color:#6b7280; margin:0;">
        <a href="tel:9600614215" style="color:#16a34a; text-decoration:none; font-weight:500;">9600614215</a> • 
        <a href="tel:8220620170" style="color:#16a34a; text-decoration:none; font-weight:500;">8220620170</a> • 
        <a href="tel:9952608689" style="color:#16a34a; text-decoration:none; font-weight:500;">9952608689</a>
      </p>

    </div>

  </div>
  
</div>
  `;
}

module.exports = { bookingConfirmationEmail };
