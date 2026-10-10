
import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Users,
  MessageSquare,
  ChartNoAxesCombined,
  LockKeyhole,
  GraduationCap,
  CheckCircle2,
  HeartHandshake,
  Menu,
  X,
  Lightbulb,
  ClipboardList,
  Search,
  RefreshCw,
  LogOut,
  Eye,
  EyeOff,
  Clock3,
  Settings,
  Sparkles,
  FileText,
  CircleHelp,
  AlertCircle,
} from "lucide-react";

import "./app.css";

const STORAGE_KEY = "processmind-feedback";
const ADMIN_KEY = "processmind-admin-session";

function getFeedback() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveFeedback(feedback) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="ProcessMind home">
      <span className="brand-mark">
        <Activity size={23} />
      </span>
      <span>
        <strong>ProcessMind</strong>
        <small>STUDENT VOICE. BETTER CAMPUS.</small>
      </span>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Brand />

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            end
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/student"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Student Portal
          </NavLink>

          <Link
            to="/admin"
            className="nav-admin-button"
            onClick={() => setMenuOpen(false)}
          >
            <LockKeyhole size={15} />
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Brand />
      <p>Built to make student voices count.</p>
      <span>ProcessMind · OSSP Project · KLH University</span>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero section-container">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={15} />
              A SMARTER CAMPUS STARTS HERE
            </span>

            <h1>
              Your voice.
              <br />
              Your campus.
              <br />
              <span>Better together.</span>
            </h1>

            <p className="hero-description">
              ProcessMind gives students a simple way to share feedback about
              academics, campus facilities, faculty and events. Help your
              university understand what matters and what can improve.
            </p>

            <div className="hero-actions">
              <Link to="/student" className="button button-primary">
                Share Feedback <ArrowRight size={17} />
              </Link>

              <Link to="/student" className="button button-secondary">
                Explore Platform
              </Link>
            </div>

            <div className="privacy-note">
              <ShieldCheck size={17} />
              Anonymous feedback by default. No name or email is required.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-main-card">
              <div className="visual-card-top">
                <div>
                  <span className="visual-kicker">CAMPUS INSIGHTS</span>
                  <h3>Student Voice</h3>
                </div>
                <span className="visual-sparkle">
                  <ChartNoAxesCombined size={22} />
                </span>
              </div>

              <div className="illustration-bars">
                {[42, 61, 49, 76, 57, 88, 66, 100, 72, 84, 60, 94].map(
                  (height, index) => (
                    <span
                      key={index}
                      className={index === 7 ? "bar-highlight" : ""}
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>

              <div className="visual-card-bottom">
                <span>
                  <i className="dot dot-green" />
                  Feedback insights
                </span>
                <span>Campus improvement</span>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="mini-icon mini-purple">
                <MessageSquare size={17} />
              </span>
              <span>
                <strong>Student feedback</strong>
                <small>Share ideas that matter</small>
              </span>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="mini-icon mini-green">
                <CheckCircle2 size={18} />
              </span>
              <span>
                <strong>Actionable insights</strong>
                <small>Identify improvement areas</small>
              </span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-inner section-container">
            <span><ShieldCheck size={18} /> Privacy-conscious feedback</span>
            <span><Users size={18} /> Designed around students</span>
            <span><ChartNoAxesCombined size={18} /> Organized campus insights</span>
            <span><HeartHandshake size={18} /> Continuous improvement</span>
          </div>
        </section>

        <section className="choice-section section-container">
          <SectionHeading
            eyebrow="CHOOSE YOUR PORTAL"
            title="One platform, two experiences"
            description="Students share their experiences. Authorized administrators review feedback and identify opportunities to improve campus life."
          />

          <div className="choice-grid">
            <article className="choice-card">
              <span className="choice-icon">
                <GraduationCap size={27} />
              </span>
              <span className="choice-label">FOR STUDENTS</span>
              <h3>Make your voice heard.</h3>
              <p>
                Submit suggestions, describe problems and share feedback about
                the campus experience without needing to identify yourself.
              </p>
              <ul>
                <li><CheckCircle2 size={16} /> Anonymous feedback form</li>
                <li><CheckCircle2 size={16} /> Academics, facilities and events</li>
                <li><CheckCircle2 size={16} /> Submission reference number</li>
              </ul>
              <Link to="/student" className="button button-primary button-wide">
                Open Student Portal <ArrowRight size={16} />
              </Link>
            </article>

            <article className="choice-card admin-choice">
              <span className="choice-icon admin-choice-icon">
                <ChartNoAxesCombined size={27} />
              </span>
              <span className="choice-label">FOR ADMINISTRATORS</span>
              <h3>Turn feedback into action.</h3>
              <p>
                Review submissions, search feedback, track statuses and
                understand recurring concerns in one organized dashboard.
              </p>
              <ul>
                <li><CheckCircle2 size={16} /> Feedback management dashboard</li>
                <li><CheckCircle2 size={16} /> Category and status filters</li>
                <li><CheckCircle2 size={16} /> Campus improvement priorities</li>
              </ul>
              <Link to="/admin" className="button button-dark button-wide">
                Admin Login <ArrowRight size={16} />
              </Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StudentPortal() {
  const [category, setCategory] = useState("Academics");
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (message.trim().length < 10) {
      setError("Please enter at least 10 characters so the feedback is useful.");
      return;
    }

    const feedback = getFeedback();
    const reference = `PM-${Date.now().toString().slice(-8)}`;

    const submission = {
      id: reference,
      category,
      eventName: category === "Events" ? eventName.trim() : "",
      message: message.trim(),
      status: "Pending",
      anonymous: true,
      createdAt: new Date().toISOString(),
    };

    try {
      saveFeedback([submission, ...feedback]);
      setSuccess(submission);
      setMessage("");
      setEventName("");
    } catch {
      setError("Could not save feedback in this browser. Please try again.");
    }
  }

  return (
    <>
      <main className="section-container portal-layout">
        <section className="portal-intro">
          <span className="eyebrow">STUDENT FEEDBACK PORTAL</span>
          <h1>
            Help us make campus <span>better.</span>
          </h1>
          <p>
            Your experience matters. Tell us what is working, what needs
            attention, or what you would like to see improve at your university.
          </p>

          <div className="portal-benefit">
            <span className="benefit-icon"><ShieldCheck size={21} /></span>
            <div>
              <strong>Anonymous by default</strong>
              <p>
                This form does not ask for your name, roll number or email.
                Avoid including identifying details in your message.
              </p>
            </div>
          </div>

          <div className="portal-benefit">
            <span className="benefit-icon"><ClipboardList size={21} /></span>
            <div>
              <strong>Every submission has a reference</strong>
              <p>
                Keep the reference number shown after submission for your
                records.
              </p>
            </div>
          </div>

          <div className="portal-benefit">
            <span className="benefit-icon"><Lightbulb size={21} /></span>
            <div>
              <strong>Constructive feedback helps</strong>
              <p>
                Explain the issue clearly and, when possible, suggest a
                practical improvement.
              </p>
            </div>
          </div>

          <div className="portal-help">
            <CircleHelp size={17} />
            <span>
              This demo stores feedback in this browser only. For shared,
              persistent submissions, connect a secure backend and database.
            </span>
          </div>
        </section>

        <section className="feedback-form-card">
          {success ? (
            <div className="success-panel">
              <span className="success-icon"><CheckCircle2 size={32} /></span>
              <span className="eyebrow">SUBMISSION SAVED</span>
              <h3>Thank you for speaking up!</h3>
              <p>
                Your feedback has been saved in this browser for the ProcessMind
                demo.
              </p>
              <div className="reference-box">
                <small>YOUR REFERENCE NUMBER</small>
                <strong>{success.id}</strong>
              </div>
              <p className="success-small">
                Category: {success.category}
              </p>
              <button
                className="button button-primary button-wide"
                onClick={() => setSuccess(null)}
              >
                Submit More Feedback <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="form-card-heading">
                <div>
                  <span className="eyebrow">YOUR FEEDBACK</span>
                  <h2>Tell us what you think</h2>
                </div>
                <span className="form-heading-icon">
                  <MessageSquare size={22} />
                </span>
              </div>

              {error && (
                <div className="error-message" role="alert">{error}</div>
              )}

              <form className="feedback-form" onSubmit={handleSubmit}>
                <label htmlFor="category">Feedback category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Academics</option>
                  <option>Faculty</option>
                  <option>Campus Facilities</option>
                  <option>Events</option>
                  <option>Student Support</option>
                  <option>Other</option>
                </select>

                {category === "Events" && (
                  <>
                    <label htmlFor="eventName">Event name (optional)</label>
                    <input
                      id="eventName"
                      value={eventName}
                      onChange={(event) => setEventName(event.target.value)}
                      placeholder="Which event is your feedback about?"
                      maxLength={100}
                    />
                  </>
                )}

                <label htmlFor="message">Your feedback</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Describe your experience or suggest an improvement..."
                  maxLength={2000}
                  required
                  minLength={10}
                />

                <div className="character-count">
                  <span>Please do not include personal information.</span>
                  <span>{message.length}/2000</span>
                </div>

                <button className="button button-primary button-wide submit-button" type="submit">
                  Submit Anonymous Feedback <ArrowRight size={16} />
                </button>

                <p className="form-privacy">
                  <ShieldCheck size={14} />
                  Your identity is not requested by this form.
                </p>
              </form>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    // Demo-only credentials. Replace with server-side authentication.
    if (
      email.trim().toLowerCase() === "admin@processmind.demo" &&
      password === "ProcessMind@123"
    ) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      navigate("/admin/dashboard");
    } else {
      setError(
        "Invalid demo credentials. Use admin@processmind.demo and ProcessMind@123."
      );
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
              <p>Review submission counts and category patterns.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span><Settings size={20} /></span>
            <div>
              <strong>Track progress</strong>
              <p>Update a submission from pending to in progress or resolved.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span><LockKeyhole size={20} /></span>
            <div>
              <strong>Restricted demo portal</strong>
              <p>This frontend demo uses a temporary session flag.</p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-card-icon"><LockKeyhole size={24} /></span>
          <h2>Admin sign in</h2>
          <p className="auth-subtitle">
            Sign in to open the feedback management dashboard.
          </p>

          {error && <div className="error-message" role="alert">{error}</div>}

          <form className="feedback-form" onSubmit={handleLogin}>
            <label htmlFor="adminEmail">Admin email</label>
            <input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter admin email"
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

            <button className="button button-primary button-wide submit-button" type="submit">
              Sign In Securely <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-security-note">
            <ShieldCheck size={15} />
            Demo authentication — not production security
          </div>

          <Link to="/" className="back-home">
            <ArrowRight size={14} className="back-arrow" /> Back to homepage
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(getFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  function refreshFeedback() {
    setFeedback(getFeedback());
  }

  function logout() {
    sessionStorage.removeItem(ADMIN_KEY);
    navigate("/admin");
  }

  function updateStatus(id, status) {
    const updated = feedback.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setFeedback(updated);
    saveFeedback(updated);
  }

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch =
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All categories" || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All statuses" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const pending = feedback.filter((item) => item.status === "Pending").length;
  const inProgress = feedback.filter(
    (item) => item.status === "In Progress"
  ).length;
  const resolved = feedback.filter((item) => item.status === "Resolved").length;

  const categoryCounts = feedback.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const priorities = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <>
      <main className="section-container dashboard-container">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">PROCESSMIND / ADMINISTRATION</span>
            <h1>Feedback dashboard</h1>
            <p>
              Review student submissions and manage their progress. This
              dashboard displays feedback saved in this browser.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="button button-secondary refresh-button"
              onClick={refreshFeedback}
            >
              <RefreshCw size={15} /> Refresh
            </button>
            <button
              className="button button-dark refresh-button"
              onClick={logout}
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={<MessageSquare size={20} />}
            tone="tone-purple"
            label="Total feedback"
            value={feedback.length}
            caption="All saved submissions"
          />
          <StatCard
            icon={<Clock3 size={20} />}
            tone="tone-orange"
            label="Pending"
            value={pending}
            caption="Waiting for review"
          />
          <StatCard
            icon={<Activity size={20} />}
            tone="tone-blue"
            label="In progress"
            value={inProgress}
            caption="Being addressed"
          />
          <StatCard
            icon={<CheckCircle2 size={20} />}
            tone="tone-green"
            label="Resolved"
            value={resolved}
            caption="Marked as resolved"
          />
        </div>

        <div className="dashboard-main-grid">
          <section className="dashboard-card">
            <div className="dashboard-card-heading">
              <div>
                <h2>Feedback activity</h2>
                <p>Overview of feedback currently saved in this browser.</p>
              </div>
              <span className="heading-icon">
                <ChartNoAxesCombined size={20} />
              </span>
            </div>

            {feedback.length === 0 ? (
              <div className="chart-empty">
                <ChartNoAxesCombined size={32} />
                <strong>No feedback yet</strong>
                <span>
                  Student submissions will appear here after they are saved.
                </span>
                <Link to="/student" className="button button-secondary">
                  Open student portal
                </Link>
              </div>
            ) : (
              <div className="priority-list">
                {priorities.map(([label, count], index) => (
                  <div className="priority-item" key={label}>
                    <span className="priority-rank">{index + 1}</span>
                    <div className="priority-details">
                      <div className="priority-label-row">
                        <strong>{label}</strong>
                        <span>
                          {count} {count === 1 ? "submission" : "submissions"}
                        </span>
                      </div>
                      <div className="priority-track">
                        <span
                          style={{
                            width: `${(count / feedback.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-card">
            <div className="dashboard-card-heading">
              <div>
                <h2>Improvement priorities</h2>
                <p>Categories with the most submissions.</p>
              </div>
              <span className="heading-icon"><Lightbulb size={20} /></span>
            </div>

            {priorities.length === 0 ? (
              <div className="priority-empty">
                Categories will appear when feedback is submitted.
              </div>
            ) : (
              <div className="priority-list">
                {priorities.map(([category, count], index) => (
                  <div className="priority-item" key={category}>
                    <span className="priority-rank">{index + 1}</span>
                    <div className="priority-details">
                      <div className="priority-label-row">
                        <strong>{category}</strong>
                        <span>{count} total</span>
                      </div>
                      <div className="priority-track">
                        <span
                          style={{
                            width: `${(count / feedback.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="priority-note">
              <Sparkles size={16} />
              <p>
                These are simple category counts, not AI-generated
                recommendations. Review the actual messages before making
                decisions.
              </p>
            </div>
          </section>
        </div>

        <section className="dashboard-card submissions-card">
          <div className="submissions-heading">
            <div>
              <h2>Student submissions</h2>
              <p>Search feedback and update its review status.</p>
            </div>
            <span className="submission-total">
              {filteredFeedback.length} shown
            </span>
          </div>

          <div className="table-toolbar">
            <div className="search-wrap">
              <Search size={16} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search feedback or reference..."
                aria-label="Search submissions"
              />
            </div>

            <div className="filter-wrap">
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                aria-label="Filter by category"
              >
                <option>All categories</option>
                <option>Academics</option>
                <option>Faculty</option>
                <option>Campus Facilities</option>
                <option>Events</option>
                <option>Student Support</option>
                <option>Other</option>
              </select>
            </div>

            <div className="filter-wrap">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
              >
                <option>All statuses</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div className="submission-list">
            {filteredFeedback.length === 0 ? (
              <div className="table-empty">
                <FileText size={29} />
                <strong>No submissions found</strong>
                <span>Try a different search or submit feedback as a student.</span>
              </div>
            ) : (
              filteredFeedback.map((item) => (
                <article className="submission-item" key={item.id}>
                  <div className="submission-topline">
                    <div className="submission-meta">
                      <span className="category-pill">{item.category}</span>
                      <span className="submission-reference">{item.id}</span>
                      <span className="submission-date">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <p className="submission-message">{item.message}</p>

                  <div className="submission-bottomline">
                    <span className="anonymous-label">
                      <ShieldCheck size={14} /> Anonymous submission
                    </span>

                    <label className="status-control">
                      Update status
                      <select
                        value={item.status}
                        onChange={(event) =>
                          updateStatus(item.id, event.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </label>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="dashboard-disclaimer">
          <AlertCircle size={15} />
          Demo limitation: feedback and status changes are stored in this
          browser's local storage. They are not shared between devices and
          should not be treated as a secure university system.
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ icon, tone, label, value, caption }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`}>{icon}</span>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-caption">{caption}</span>
    </article>
  );
}

function StatusBadge({ status }) {
  const className =
    status === "Resolved"
      ? "status-resolved"
      : status === "In Progress"
        ? "status-in-progress"
        : "status-pending";

  return <span className={`status-badge ${className}`}>{status}</span>;
}

function NotFound() {
  return (
    <>
      <main className="not-found">
        <span className="form-heading-icon"><Search size={24} /></span>
        <span className="eyebrow">404 · PAGE NOT FOUND</span>
        <h1>This page couldn't be found.</h1>
        <p>Return to the ProcessMind homepage to continue.</p>
        <Link to="/" className="button button-primary">
          Back to Home <ArrowRight size={16} />
        </Link>
      </main>
      <Footer />
    </>
  );
}

function ProtectedAdminDashboard() {
  const isAdmin = sessionStorage.getItem(ADMIN_KEY) === "true";
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <main className="not-found">
        <span className="form-heading-icon"><LockKeyhole size={24} /></span>
        <h1>Admin sign in required</h1>
        <p>Please sign in to access the dashboard.</p>
        <button
          className="button button-primary"
          onClick={() => navigate("/admin")}
        >
          Go to Admin Login <ArrowRight size={16} />
        </button>
      </main>
    );
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
