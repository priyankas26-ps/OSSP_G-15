
function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const navigate = useNavigate();

  const DEMO_ADMIN_ID = "2520030540";
  const DEMO_ADMIN_PASSWORD = "@Priyanka2627";

  async function copyCredential(value, field) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setError("Copy unavailable. Please select and copy the credential manually.");
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (
      adminId.trim() === DEMO_ADMIN_ID &&
      password === DEMO_ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect Admin ID or password. Please use the demo credentials shown below.");
    }
  }

  return (
    <>
      <main className="section-container auth-layout">
        <section className="auth-promo">
          <span className="eyebrow">
            <ShieldCheck size={15} /> ADMINISTRATION PORTAL
          </span>

          <h1>
            Better decisions start with <span>insight.</span>
          </h1>

          <p>
            Access the ProcessMind demo dashboard to review student feedback,
            organize submissions and track progress on campus concerns.
          </p>

          <div className="auth-feature">
            <span><ChartNoAxesCombined size={20} /></span>
            <div>
              <strong>Feedback overview</strong>
              <p>Review submissions and category patterns.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span><Settings size={20} /></span>
            <div>
              <strong>Track progress</strong>
              <p>Update submissions from pending to resolved.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span><LockKeyhole size={20} /></span>
            <div>
              <strong>Demo administrator access</strong>
              <p>Use the credentials provided on this page.</p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-card-icon">
            <LockKeyhole size={24} />
          </span>

          <h2>Admin sign in</h2>
          <p className="auth-subtitle">
            Sign in to open the ProcessMind feedback dashboard.
          </p>

          {/* DEMO CREDENTIALS BOX */}
          <div className="demo-credentials">
            <div className="demo-credentials-heading">
              <ShieldCheck size={19} />
              <div>
                <strong>Demo Admin Credentials</strong>
                <p>Use these details for the project demonstration.</p>
              </div>
            </div>

            <div className="demo-credential-row">
              <div className="demo-credential-value">
                <span>ADMIN ID</span>
                <strong>{DEMO_ADMIN_ID}</strong>
              </div>
              <button
                type="button"
                className="demo-copy-button"
                onClick={() => copyCredential(DEMO_ADMIN_ID, "id")}
              >
                {copied === "id" ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="demo-credential-row">
              <div className="demo-credential-value">
                <span>PASSWORD</span>
                <strong>{DEMO_ADMIN_PASSWORD}</strong>
              </div>
              <button
                type="button"
                className="demo-copy-button"
                onClick={() =>
                  copyCredential(DEMO_ADMIN_PASSWORD, "password")
                }
              >
                {copied === "password" ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="demo-credentials-note">
              Public demo credentials — do not use for real student data.
            </p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form className="feedback-form" onSubmit={handleLogin}>
            <label htmlFor="adminId">Admin ID</label>
            <input
              id="adminId"
              type="text"
              inputMode="numeric"
              value={adminId}
              onChange={(event) => setAdminId(event.target.value)}
              placeholder="Enter Admin ID"
              autoComplete="username"
              required
            />

            <label htmlFor="adminPassword">Password</label>
            <div className="password-wrap">
              <input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <><EyeOff size={14} /> Hide</>
                ) : (
                  <><Eye size={14} /> Show</>
                )}
              </button>
            </div>

            <button
              className="button button-primary button-wide submit-button"
              type="submit"
            >
              Sign In to Dashboard <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-security-note">
            <ShieldCheck size={15} />
            Demo authentication — not production security
          </div>

          <Link to="/" className="back-home">
            <ArrowRight size={14} className="back-arrow" />
            Back to homepage
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
