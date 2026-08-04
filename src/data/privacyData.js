export const PRIVACY_LAST_UPDATED = "August 4, 2026";

export const PRIVACY_SECTIONS = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    paragraphs: [
      "Welcome to QuizBolt — a university-level Computer-Based Test (CBT) practice platform built by students, for students. This Privacy Policy explains what information QuizBolt (\"we,\" \"us,\" or \"our\") collects, how we use it, where we store it, how long we keep it, and the choices and rights you have when you use the Service.",
      "\"Service\" means the QuizBolt website (quizbolt.site), mobile web application, Progressive Web App (PWA), Android APK, and all related features, APIs, dashboards, and educational content — including practice exams, flashcards, theory, fill-in-the-blank, Test, Match, leaderboards, the referral program, Premium memberships, and user reviews.",
      "We have designed this policy to be specific to QuizBolt. It only describes the data the platform actually processes today. It does not describe any data we do not collect, or invent categories of information just to sound comprehensive. If a feature (such as push notifications or profile images) is optional and off by default, this policy clearly says so.",
      "By using QuizBolt, creating an account, or purchasing Premium, you acknowledge that you have read and understood this Privacy Policy in full.",
    ],
  },
  {
    id: "information-you-provide",
    number: "2",
    title: "Information You Provide to Us",
    paragraphs: [
      "You directly give QuizBolt information at several points in the user journey. This is the primary category of personal data we hold about you:",
    ],
    bullets: [
      "Account creation data: When you sign up with Google (via Supabase OAuth) or register with email and password, we receive your name, verified email address, and a unique user ID issued by the authentication provider. Google OAuth also occasionally provides a profile image from your Google account; we only save it if you explicitly choose to use it and upload/save it via the Upload Profile Picture flow.",
      "Onboarding information: During the first-time onboarding flow you voluntarily provide your: full name (editable later), display username, university selection, college/faculty, department, and academic year (Year 1 through Year 4). These fields are required because QuizBolt's courses, question banks, and recommended exams are filtered specifically for your university and level.",
      "Optional referral code: During onboarding you may paste or auto-supply a referral code from the `quizbolt_referral_code` localStorage key (captured earlier from a `?ref=` URL). This code creates a record in the referrals table linking you to the referring user.",
      "Optional profile picture: You may upload an avatar image at any time. Images are transmitted to Cloudinary via our secure `/api/cloudinary/upload` endpoint; only the resulting `avatar_url` (public HTTPS URL) and `avatar_public_id` (Cloudinary resource identifier) are stored against your profile row.",
      "Optional user reviews: From Settings -> Submit a Review, you may write a free-text review of up to 500 characters. This is inserted into the `reviews` table with your `user_id` and, once approved, may be displayed publicly on the landing page with your first name, university, and year.",
      "Messages you send us: When you contact QuizBolt on WhatsApp (+234 701 558 5397), email support@quizbolt.site, or use the report-a-problem flow, you voluntarily share the contents of your message and any attached receipts, screenshots, or files.",
    ],
    paragraphsAfter: [
      "You are never required to provide a government-issued ID card, home address, bank account number, BVN, or date of birth to use QuizBolt. If we ask for any of these in a specific context (e.g., a refund), it is purely voluntary on your part.",
    ],
  },
  {
    id: "information-automatically-collected",
    number: "3",
    title: "Information Collected Automatically",
    paragraphs: [
      "In addition to what you explicitly type in, the following information is generated or persisted automatically as a side-effect of using QuizBolt:",
    ],
    bullets: [
      "Study progress and performance data: Every Objective exam submission creates a row in the `exam_attempts` table. Every Test session submission creates a row in `test_attempts`. Every Match-mode run creates a row in `match_attempts`. Each record typically contains: user ID, course ID, score, total questions, percentage, time taken, whether the attempt was a retake (`is_retake`), timestamps, and occasionally a serialised `answers` snapshot (for failure-analysis views).",
      "Bookmarks and favourites: Questions you bookmark mid-exam are persisted inside the `bookmarks` JSON array field on your `profiles` row. Courses you favourite/star on the home dashboard are persisted inside the `favourite_courses` JSON array field on your profile.",
      "Premium subscription state: Your `is_premium` boolean, `premium_expires_at` timestamp, and any related Premium activation history live on the `profiles` table and any related Premium-redeem audit logs maintained in our backend API.",
      "Referral data: Each referral link clicked that results in a sign-up writes a `referrals` row (referrer_id, referred_id, is_validated flag, created_at). Your `profiles.referral_code` string is auto-generated the first time your referral dashboard loads so you can share it with friends.",
      "Push subscription tokens: If you explicitly enable push notifications (Settings -> Daily test reminders), we call the browser's PushManager.subscribe() method and upsert a row into `push_subscriptions` containing your user_id plus the three standard Web Push values: endpoint URL, p256dh key, and auth key. Nothing extra is collected; the feature is fully off by default.",
      "Aggregated analytics: QuizBolt uses Google Analytics 4 (Measurement ID `G-Z745YX8682`) loaded via the standard gtag snippet in index.html. Analytics data is aggregated and includes page_path, page_title, action names, and event parameters such as course_id, score_percent, question_count, time_taken, login method, university, college, feature gate hit, PWA install status, or dark-mode toggle state. Analytics are explicitly designed not to contain email addresses or raw personal identifiers; they are used solely to understand which features students find valuable, so we can prioritize improvements.",
      "Device and browser signals: Standard Web analytics inherently observe approximate country-level geolocation (derived from IP address — we do not ask for GPS permission), user agent string, viewport size, browser language, referring domain, and exit URL. These are processed through Supabase/Vercel/Google infrastructure without QuizBolt separately asking for them.",
    ],
  },
  {
    id: "how-we-use-information",
    number: "4",
    title: "How We Use Your Information",
    paragraphs: [
      "QuizBolt uses information solely for the purpose of providing and improving the educational Service. The specific legal basis for each use (for users in jurisdictions that distinguish) is typically the performance of a contract with you, your consent where expressly requested, or our legitimate interests in operating and improving an educational platform. The actual uses are:",
    ],
    bullets: [
      "Deliver the core educational experience: filter the question bank to courses that are actually taught at your university/college/department/year, let you start and submit exams, and compute your score and time.",
      "Show you dashboards, history, and insights: build the Home summary, the History screen (exams/tests/matches tabs), per-course improvement curves, and the averages/retake stats cards.",
      "Run Premium features and gating: enforce Premium-only toggles (auto-advance, shuffle control, unlimited hints), unlock Theory mode and the full flashcard decks, and track when Premium will expire so we can surface an in-app reminder before it does.",
      "Referral rewards: Calculate how many of your five required referrals have been validated and — when the threshold is crossed — automatically award you 7 days of free Premium access to your profile.",
      "Leaderboards: Rank non-retake first-attempt exam submissions against other students on the daily global leaderboard, plus separate Test/Match-mode boards, using score and time.",
      "Bookmarks and answer review: let you revisit a bookmarked question set later and walk you through every failure (wrong answer) after an exam.",
      "Personalization: suggest courses you haven't practised yet, remember your dark-mode and quiz-behaviour preferences from Settings, and on returning visits skip straight to the dashboard rather than the onboarding screen.",
      "Push notifications (opt-in only): if you enabled reminders, occasionally send a browser push when you have not taken a test that day. You may disable this at any time from Settings and the related `push_subscriptions` row will be deleted.",
      "Communications: respond to your WhatsApp or email support enquiries, process refund requests, send a receipt or activation code after a Premium purchase, and — very rarely — inform you of material changes to these Terms/Privacy or a critical platform outage.",
      "App improvement, maintenance, and debugging: look at aggregated GA4 events, Supabase logs, and (if you submitted it) review feedback, in order to fix bugs, add courses for underserved levels, and improve UX.",
      "Safety, fraud, and abuse prevention: investigate suspected cheating on leaderboards, Premium activation-code sharing, referral farming (fake accounts), and terms-of-service violations in order to keep the platform fair and safe.",
    ],
  },
  {
    id: "premium-payments",
    number: "5",
    title: "Premium Payments and Financial Data",
    paragraphs: [
      "QuizBolt does NOT process credit cards, debit cards, or online card payments itself. We do not run a payment gateway, we do not store card numbers or CVVs, and we never ask for them.",
      "Premium is purchased by manually transferring the exact Naira amount to the Palmpay account number published on the Premium page (Account Number 8911504030, Account Name Jeffrey Austin) and then sending the transfer receipt, username, university, and plan on WhatsApp to +234 701 558 5397. A QuizBolt operator reviews the receipt and issues a single-use Premium activation code, which is then redeemed through the `/api/premium/redeem` endpoint against your user ID.",
      "Therefore, the financial data QuizBolt actually sees is: (a) the WhatsApp receipt image you voluntarily forwarded, (b) the plan, the amount paid, and the timestamp of issuance, and (c) the link between a code and the user ID that redeemed it. The actual bank-side transfer happens inside Palmpay and your own bank, under their privacy policies. QuizBolt has no access to the underlying bank transaction data beyond what is visible on a customer receipt.",
    ],
  },
  {
    id: "cookies-storage",
    number: "6",
    title: "Cookies, Local Storage, and Session Storage",
    paragraphs: [
      "QuizBolt stores a limited amount of structured data directly in your browser so the platform can work without round-tripping to the server on every interaction. None of this information is used for behavioural advertising. The specific keys and purposes are:",
    ],
    bullets: [
      "Supabase Auth session (persisted in browser local storage under keys managed by the Supabase client library): the `sb-access-token`, `sb-refresh-token`, and related auth cookies/local-storage entries required to keep you signed in across tabs and page refreshes.",
      "In-progress exam session (local storage): if your browser hard-refreshes mid-exam, the current question index, selected answers, and exam metadata are restored from `quizbolt_exam_session`. This means you do not lose your work.",
      "Quiz preferences (local storage): `autoAdvancePreference`, `shuffleOptionsPreference`, `unlimitedHintsPreference`, `showPaginationPreference`, and `theme` (dark vs light mode) let Settings values persist across visits.",
      "Referral capture (local storage): if you arrive at /signup?ref=QB-XXXX, the referral code is cached in `quizbolt_referral_code` and applied automatically during onboarding so you don't lose the referrer link even if you bounce around before signing up.",
      "Caching and UI helpers (local storage): `quizbolt_is_new_user` (first-time flow), `quizbolt_notifications_enabled` (push opt-in cache), `pwaInstalled`, `pwaPromptSnoozedUntil`, `notificationCardDismissedUntil`, `skipAvatar`, `visited` (landing has been seen before), `examHistory` (local backup), course hint dismissals, WhatsApp CARD dismissal timestamps, FeedBolt banner dismissal, and per-user Home dashboard cache keys.",
      "Cookies: Third-party GA4 and Google Tag Manager cookies (prefixed `_ga`, `_gid`, `_gat_*`) are set by the gtag.js snippet for aggregated analytics, as described in Section 3. There are no first-party QuizBolt advertising cookies. You can block or delete these cookies via your browser settings — the educational platform itself still works, but analytics will not record your particular session.",
    ],
  },
  {
    id: "account-security",
    number: "7",
    title: "Account Security",
    paragraphs: [
      "QuizBolt delegates credential management to Supabase Authentication, which uses industry-standard hashing, JWT session tokens with short-lived access and refresh-token rotation, and rate-limited login endpoints. If you sign up via Google OAuth, QuizBolt never sees a password on its servers at all.",
      "That said, the security of your QuizBolt account also depends on you. You must protect the login credentials for your Google or email account, avoid typing your password into any third-party site, and use the screen-lock on your phone and laptop if you share devices with others. If you suspect someone gained access to your QuizBolt account without permission, message us on WhatsApp immediately.",
      "Any Premium activation code sent to you is single-use and should be treated as a confidential value. Don't post or share your code publicly, and only redeem it through the logged-in Premium page form on quizbolt.site.",
    ],
  },
  {
    id: "study-progress",
    number: "8",
    title: "Study Progress and Performance Data",
    paragraphs: [
      "Your exam results, Test/Match sessions, bookmarks, and flashcard ratings are at the core of QuizBolt. We store these records specifically so that:",
    ],
    bullets: [
      "You can look back at your History screen to see how much you improved over weeks or months.",
      "The Home dashboard can calculate correct-rate averages, retake percentages, total study minutes, and streak-like counters.",
      "Premium failure-review mode can re-show you the exact questions you got wrong after an exam.",
      "Leaderboards can fairly rank first-attempt exams without exposing your full name publicly (only your username, year, and university are shown in leaderboard rows).",
    ],
    paragraphsAfter: [
      "Individual per-question answer records are never sold, rented, or shared with advertising networks. Only aggregated, de-identified summary statistics (e.g., \"64% of TASUED 200L students got question Q-1092 wrong\") may be used internally for curation and content-quality improvement.",
    ],
  },
  {
    id: "referral-information",
    number: "9",
    title: "Referral Information",
    paragraphs: [
      "When User A invites User B through a referral link or code, the following data is written:",
    ],
    bullets: [
      "A `profiles.referral_code` alphanumeric code (e.g., `QB-T4LD`) generated for the referrer and displayed on the Referral Dashboard for copying or sharing as `/signup?ref=QB-T4LD`.",
      "A `referrals` row in Supabase holding: `referrer_id` (User A's UUID), `referred_id` (User B's UUID after sign-up), `is_validated` boolean (false by default, flipped to true once QuizBolt has confidence User B is a real, active student), and `created_at` timestamp.",
      "The Referral Dashboard shows User A the full name/display name of each person they referred (columns pulled from the `referred: referred_id (full_name, user_name)` join on `profiles`). This is necessary so User A can tell which of their invites worked and why a given sign-up is or isn't validated.",
    ],
    paragraphsAfter: [
      "You may not want to be visible on someone's referral list if you don't know them. If this situation applies to you, message support and we will disconnect the referral edge (which also invalidates any un-validated entry, so the referrer does not count you toward their 5-referral reward).",
    ],
  },
  {
    id: "data-sharing",
    number: "10",
    title: "Data Sharing and Disclosures",
    paragraphs: [
      "QuizBolt does NOT sell your personal information to third parties and has no intention to start. We only disclose information to the following, very limited categories of recipients:",
    ],
    bullets: [
      "Sub-processors that power the platform under signed contracts with appropriate security obligations: Supabase Inc. (authentication + PostgreSQL database + row-level policies + push subscription storage), Vercel Inc. (hosting + edge functions), Cloudinary Inc. (profile picture storage + image CDN), and Palmpay/Opay-related payment rail operators only to the extent of verifying a specific Premium transfer you explicitly made.",
      "Google LLC (for Google Analytics 4, as described in Section 3) — only aggregated, pseudonymised analytics events, never your email or full name as a direct GA parameter.",
      "Approved public reviews: if you wrote a review through Settings and it was approved, only your first name, university, year, and review text appear on the public About/Landing pages. Your email, username, and user ID are never included in public reviews.",
      "Leaderboard surfaces: only your display username, university, and year/level are shown next to a leaderboard score. Full names or email addresses are never listed.",
      "Law enforcement, regulators, or courts: we will disclose information only when we reasonably believe disclosure is required by Nigerian law or an enforceable official demand, and — where practical — after giving you notice unless legally prohibited.",
      "Change of control: if QuizBolt is involved in a merger, acquisition, restructuring, or asset sale (not currently planned), transferred user data would continue to be protected by a policy at least as protective as this one and new owners would notify you via in-app banner before data handling materially changes.",
    ],
  },
  {
    id: "third-party-services",
    number: "11",
    title: "Third-Party Services and Their Own Policies",
    paragraphs: [
      "Because QuizBolt is built on a modern stack of best-in-class providers, your use of the Service is also subject to the privacy policies of those providers when they process data on our behalf or you interact with them directly:",
    ],
    bullets: [
      "Supabase Inc. (supabase.com/privacy) — auth, database, push_subscriptions rows.",
      "Vercel Inc. (vercel.com/legal/privacy) — hosting, build, edge runtime, plus optional Speed Insights/Web Vitals telemetry if present in the React bundle.",
      "Cloudinary Ltd. (cloudinary.com/privacy) — avatar uploads and image delivery.",
      "Google (policies.google.com/privacy) — Google OAuth sign-in, GA4 analytics, Google fonts loaded via the Google Fonts CDN.",
      "Palmpay / your bank (policies vary) — direct bank transfers for Premium, processed entirely between you and your payment provider; QuizBolt only sees the receipt image you forward.",
    ],
    paragraphsAfter: [
      "If you click social icons in the footer (Instagram, X, WhatsApp Channel, TikTok, YouTube, LinkedIn, Facebook), you navigate to those third-party sites and whatever data they then collect is governed by their own privacy policies — not this one.",
    ],
  },
  {
    id: "data-retention",
    number: "12",
    title: "Data Retention",
    paragraphs: [
      "We keep your data only as long as needed to run QuizBolt or as required by law. The rough retention schedule for each category is:",
    ],
    bullets: [
      "Profiles (name, username, university/college/department/year, avatar, referral code, is_premium, bookmarks, favourite_courses): retained for the lifetime of your account, because they are required every time you log in.",
      "Exam, Test, and Match attempts: retained for the lifetime of your account so the History screen and improvement dashboards can show long-term progress. You may delete individual attempts from the History screen, or clear everything via the Delete account flow.",
      "Referrals rows: retained as long as either the referrer or referred account is still active, because reward validation checks rely on the historical edge.",
      "Push subscriptions: retained while opt-in is active; deleted immediately when you toggle notifications off in Settings.",
      "Submitted reviews: retained after approval for display on the landing page until either the review is removed or your account is deleted.",
      "Premium activation code audit logs, receipts you forwarded, and support correspondence: retained for a minimum of 12 months after the Premium period ends, then deleted or anonymised, except where the law or a pending dispute requires longer.",
      "GA4 analytics events: retained in Google's systems according to Google's default data-retention settings, which QuizBolt configures to the standard 2–14 month window before automatic aggregation.",
      "Local storage entries on your device: persist until you clear browser storage, uninstall the PWA, or explicitly use Delete account/Sign out which triggers a localStorage.clear() call.",
    ],
    paragraphsAfter: [
      "If you delete your account via Settings -> Delete account, QuizBolt issues a DELETE request to our `/api/users/delete-account` endpoint, which removes your profile, attempts, bookmarks, referrals, push subscriptions, and review rows, and additionally calls Cloudinary's delete endpoint if you had an avatar. On-device localStorage is also cleared except for the minimal `visited` and notifications-cache flags. Deletion typically completes within a few minutes of the request.",
    ],
  },
  {
    id: "user-rights",
    number: "13",
    title: "Your Rights and Choices",
    paragraphs: [
      "Regardless of where you live, you have the following practical options with respect to your QuizBolt data. All of them are either self-serve from the app, or achievable with a single WhatsApp message:",
    ],
    bullets: [
      "Access your data: you can view the main profile fields on your Profile page, every exam/test/match attempt on the History page, bookmarks on the Bookmarks page, and referrals/referral code on the Referral Dashboard. For anything not visible in the UI, send us a message and we'll reply with a structured export within a reasonable timeframe.",
      "Update or correct your data: edit your full name, display username, and department directly from Profile. Change university/college/year by contacting support — we deliberately require manual verification for these because they change which question bank you see.",
      "Upload, replace, or delete your profile picture: the Upload Profile Picture page has self-serve Replace and Delete buttons.",
      "Delete your account and everything attached to it: use Settings -> Delete account. This is irreversible.",
      "Opt out of non-essential communications: you can disable push notifications from Settings. We only send platform-critical messages (refund confirmations, account recovery, legal policy updates) through the remaining channels; you may opt out of even those by writing to us.",
      "Control cookies and analytics: use your browser's built-in cookie controls to block GA4 cookies, or use an ad/tracker blocker extension (the core educational features still work).",
      "Referral disconnect: as described in Section 9, message us to be unlinked from any referrer or remove a referrer→referred edge.",
      "Children's rights: see the next section below.",
    ],
    paragraphsAfter: [
      "We do not charge fees for reasonable access, correction, or deletion requests, and we aim to respond to most WhatsApp enquiries within 24 hours.",
    ],
  },
  {
    id: "children",
    number: "14",
    title: "Children's Privacy",
    paragraphs: [
      "QuizBolt is designed for university students preparing for degree-level CBT examinations at Nigerian tertiary institutions and is intentionally not marketed to children under the age of 16.",
      "Our Terms of Service require you to be at least 16 years old, or to use the account only under the supervision of a parent or guardian. If we somehow learn that a child under 13 provided us with personal information, we will immediately delete that information and the associated account on receipt of a takedown notice from a parent or legal guardian at support@quizbolt.site or via WhatsApp.",
    ],
  },
  {
    id: "updates",
    number: "15",
    title: "Updates to This Privacy Policy",
    paragraphs: [
      "We may revise this Privacy Policy from time to time when QuizBolt introduces new features (e.g., a new study mode or integration), changes a sub-processor, or updates the retention schedule to reflect a new legal requirement.",
      "When we make material changes we will: (a) update the Last Updated date at the top of this page, (b) try to show a prominent in-app banner or landing-page notice for at least the first 7 days, and (c) if the change materially reduces your rights or shares your data with a new category of recipients, attempt to contact the email on file for users with active Premium accounts. Non-material changes (typo fixes, adding a clarifying sentence, cross-linking to a new policy page for a new optional feature) may take effect by updating the date alone.",
      "Your continued use of QuizBolt after a revised Privacy Policy is posted means you accept the changes. If you disagree, stop using the platform and, if you wish, delete your account via Settings.",
    ],
  },
  {
    id: "contact",
    number: "16",
    title: "Contact Information and Privacy Enquiries",
    paragraphs: [
      "For any question, concern, request, or complaint related to privacy, data protection, a right you wish to exercise, or a potential vulnerability you'd like to report responsibly, please reach out through any of these channels — we read all of them and WhatsApp is the fastest:",
    ],
    bullets: [
      "WhatsApp: +234 701 558 5397 (Founder: Jeffrey Austin). This is the primary support channel and typically yields a response within minutes during active hours.",
      "Email: support@quizbolt.site — good for longer-form requests, exports, takedowns, legal correspondence, or anything with large attachments.",
      "In-app flow: Settings -> Report a problem directly opens a WhatsApp template message with your issue.",
    ],
    paragraphsAfter: [
      "Thank you for trusting QuizBolt with your study data. We built this product for students first, and we treat your privacy the way we'd want our own student data treated.",
    ],
  },
];
