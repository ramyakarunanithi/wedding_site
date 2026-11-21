export default function Marquee() {
  const content = (
    <>
      {/* 🇬🇧 1. English */}
      <span className="lang-pill">ENG</span>
      <span>Dr. Gokulraj</span>
      <i>♥</i>
      <span>Dr. Megala</span>
      <i>✦</i>
      <span>22 & 23 Nov 2026</span>
      <i>✦</i>
      <span>Kallakurichi</span>
      <i>♥</i>
      <span>Two Doctors, One Heart</span>
      <i>✦</i>

      {/* 🇮🇳 2. Tamil (தமிழ்) */}
      <span className="lang-pill">தமிழ்</span>
      <span>டாக்டர் கோகுல்ராஜ்</span>
      <i>♥</i>
      <span>டாக்டர் மேகலா</span>
      <i>✦</i>
      <span>22 & 23 நவம்பர் 2026</span>
      <i>✦</i>
      <span>கள்ளக்குறிச்சி</span>
      <i>♥</i>
      <span>இரு மருத்துவர்கள், ஓர் இதயம்</span>
      <i>✦</i>

      {/* 🇮🇳 3. Hindi (हिंदी) */}
      <span className="lang-pill">हिंदी</span>
      <span>डॉ. गोकुलराज</span>
      <i>♥</i>
      <span>डॉ. मेघला</span>
      <i>✦</i>
      <span>22 व 23 नवंबर 2026</span>
      <i>✦</i>
      <span>कल्लाकुरिची</span>
      <i>♥</i>
      <span>दो डॉक्टर, एक दिल</span>
      <i>✦</i>

      {/* 🇮🇳 4. Telugu (తెలుగు) */}
      <span className="lang-pill">తెలుగు</span>
      <span>డాక్టర్ గోకుల్ రాజ్</span>
      <i>♥</i>
      <span>డాక్టర్ మేఘల</span>
      <i>✦</i>
      <span>22 & 23 నవంబర్ 2026</span>
      <i>✦</i>
      <span>కల్లకురిచి</span>
      <i>♥</i>
      <span>శుభ ముహూర్తం & స్వాగతం</span>
      <i>✦</i>

      {/* 🇮🇳 5. Malayalam (മലയാളം) */}
      <span className="lang-pill">മലയാളം</span>
      <span>ഡോ. ഗോകുൽരാജ്</span>
      <i>♥</i>
      <span>ഡോ. മേഘല</span>
      <i>✦</i>
      <span>22 & 23 നവംബർ 2026</span>
      <i>✦</i>
      <span>കള്ളക്കുറിച്ചി</span>
      <i>♥</i>
      <span>മംഗളാശംസകൾ</span>
      <i>✦</i>

      {/* 🇮🇳 6. Kannada (ಕನ್ನಡ) */}
      <span className="lang-pill">ಕನ್ನಡ</span>
      <span>ಡಾ. ಗೋಕುಲ್ ರಾಜ್</span>
      <i>♥</i>
      <span>ಡಾ. ಮೇಘಲಾ</span>
      <i>✦</i>
      <span>22 & 23 ನವೆಂಬರ್ 2026</span>
      <i>✦</i>
      <span>ಕಲ್ಲಕುರಿಚಿ</span>
      <i>♥</i>
      <span>ಶುಭ ವಿವಾಹ</span>
      <i>✦</i>

      {/* 🪔 7. Sanskrit (संस्कृतम्) */}
      <span className="lang-pill">संस्कृतम्</span>
      <span>शुभ विवाह</span>
      <i>♥</i>
      <span>माङ्गल्यं तन्तुनानेन</span>
      <i>✦</i>
      <span>मङ्गल परिणय</span>
      <i>✦</i>
    </>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div>{content}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}
