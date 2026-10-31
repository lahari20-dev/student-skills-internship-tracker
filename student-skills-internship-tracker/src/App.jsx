import { useMemo, useState } from 'react';

const initialSkills = [
  { id: 1, name: 'JavaScript', group: 'Development', score: 76, icon: 'JS', color: 'yellow', target: 'Build interactive apps' },
  { id: 2, name: 'React', group: 'Development', score: 62, icon: '⚛', color: 'blue', target: 'Create component-based UIs' },
  { id: 3, name: 'UI / UX Design', group: 'Design', score: 54, icon: '✳', color: 'pink', target: 'Design with confidence' },
  { id: 4, name: 'Communication', group: 'Professional', score: 81, icon: '↗', color: 'green', target: 'Share ideas clearly' },
];
const opportunities = [
  { id: 1, role: 'Frontend Developer Intern', company: 'Pixelberry Studio', kind: 'Technology', mode: 'Hybrid', place: 'Bengaluru', stipend: '₹18k / month', match: 92, logo: 'P', tone: 'lavender', posted: '2 days ago', tags: ['React', 'JavaScript'] },
  { id: 2, role: 'Product Design Intern', company: 'Northstar Labs', kind: 'Design', mode: 'Remote', place: 'India · Remote', stipend: '₹15k / month', match: 86, logo: 'N', tone: 'peach', posted: '4 days ago', tags: ['Figma', 'UI / UX'] },
  { id: 3, role: 'Software Engineering Intern', company: 'Orbit Systems', kind: 'Technology', mode: 'On-site', place: 'Hyderabad', stipend: '₹22k / month', match: 78, logo: 'O', tone: 'mint', posted: '1 week ago', tags: ['JavaScript', 'Git'] },
  { id: 4, role: 'Community & Marketing Intern', company: 'Goodfolk Collective', kind: 'Business', mode: 'Hybrid', place: 'Chennai', stipend: '₹12k / month', match: 71, logo: 'G', tone: 'blue', posted: '1 week ago', tags: ['Writing', 'Communication'] },
];
const navItems = [['Overview','⌂'],['My skills','✳'],['Internships','▤'],['Applications','▣']];

function App() {
  const [active, setActive] = useState('Overview');
  const [skills, setSkills] = useState(initialSkills);
  const [filter, setFilter] = useState('All fields');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState([]);
  const [applied, setApplied] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillGroup, setSkillGroup] = useState('Development');
  const filtered = useMemo(() => opportunities.filter((item) => {
    const categoryMatches = filter === 'All fields' || item.kind === filter;
    return categoryMatches && `${item.role} ${item.company} ${item.kind} ${item.place} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  }), [filter, query]);
  const changeSkill = (id, amount) => setSkills((current) => current.map((skill) => skill.id === id ? { ...skill, score: Math.max(0, Math.min(100, skill.score + amount)) } : skill));
  const toggleItem = (list, setter, id) => setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const addSkill = (event) => {
    event.preventDefault();
    const cleaned = skillName.trim();
    if (!cleaned) return;
    setSkills((current) => [...current, { id: Date.now(), name: cleaned, group: skillGroup, score: 20, icon: '✦', color: 'pink', target: 'Set a learning goal' }]);
    setSkillName('');
    setShowForm(false);
  };

  return <div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#top" onClick={() => setActive('Overview')}><span className="brand-mark">p</span><span>pathfinder<span className="brand-dot">.</span></span></a>
      <div className="workspace"><span className="workspace-icon">G7</span><span><b>Group 7 Workspace</b><small>Student career hub</small></span><span className="down">⌄</span></div>
      <p className="nav-title">MENU</p><nav className="nav-list" aria-label="Main navigation">{navItems.map(([name, icon]) => <button key={name} className={`nav-item ${active === name ? 'active' : ''}`} onClick={() => setActive(name)}><span className="nav-icon">{icon}</span>{name}{name === 'Applications' && <span className="nav-badge">{applied.length}</span>}</button>)}</nav>
      <div className="sidebar-progress"><div className="progress-top"><span>YOUR CAREER PROFILE</span><b>68%</b></div><div className="profile-bar"><i style={{width:'68%'}}></i></div><p>You're building a great foundation. Keep going!</p><button onClick={() => setActive('My skills')}>Complete profile <span>↗</span></button></div>
      <div className="profile-mini"><div className="profile-avatar">TT</div><div><b>Thanusree T.</b><small>Student · Group 7</small></div><button aria-label="Profile menu">···</button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="breadcrumbs">Workspace <span>/</span> <b>{active}</b></div><div className="top-actions"><button className="help-button">? &nbsp; Help center</button><button className="bell" aria-label="Notifications">♧<i></i></button><button className="mobile-avatar">TT</button></div></header>
      <div className="content"><section className="welcome"><div><p className="eyebrow">SATURDAY, NOVEMBER 1, 2026</p><h1>Hey, Thanusree <span>✦</span></h1><p className="subhead">Small steps today. Big opportunities tomorrow.</p></div><button className="goal-button" onClick={() => setShowForm(true)}>＋ Add a skill</button></section>
        <section className="hero-panel"><div className="hero-left"><span className="hero-label"><i></i> YOUR NEXT CHAPTER</span><h2>You're closer than<br/>you <em>think.</em></h2><p>Your skills are growing. Let's connect them to an opportunity that feels right.</p><button onClick={() => setActive('Internships')}>Explore internships <span>↗</span></button></div><div className="hero-visual"><div className="orbit orbit-a"></div><div className="orbit orbit-b"></div><div className="orbit-center">✦</div><span className="float-card card-a">↗ <small>YOUR SKILLS</small></span><span className="float-card card-b">✳ <small>NEW PATHS</small></span><span className="float-card card-c">◎ <small>YOUR FUTURE</small></span><div className="hero-caption">A little progress<br/>is still progress.</div></div><span className="hero-number">01 / 03</span></section>
        <section className="overview-cards"><article className="metric-card"><span className="metric-icon tint-lilac">✳</span><div><small>SKILLS IN PROGRESS</small><b>{skills.length}<span> skills</span></b><p>Keep your momentum up</p></div><span className="metric-arrow">↗</span></article><article className="metric-card"><span className="metric-icon tint-green">▤</span><div><small>GOOD-FIT INTERNSHIPS</small><b>12<span> matches</span></b><p>Based on your growing profile</p></div><span className="metric-arrow">↗</span></article><article className="metric-card"><span className="metric-icon tint-peach">▣</span><div><small>APPLICATIONS SENT</small><b>{applied.length}<span> this month</span></b><p>Every application is a step</p></div><span className="metric-arrow">↗</span></article></section>
        <section className="skills-section"><div className="section-head"><div><p className="eyebrow">YOUR TOOLKIT</p><h2>Skills in progress <span>✦</span></h2></div><button className="subtle-link" onClick={() => setActive('My skills')}>See all skills <span>↗</span></button></div><div className="skills-grid">{skills.slice(0,4).map((skill) => <article className="skill-card" key={skill.id}><div className="skill-top"><span className={`skill-icon ${skill.color}`}>{skill.icon}</span><button className="more" aria-label={`More ${skill.name} options`}>···</button></div><p className="skill-group">{skill.group}</p><div className="skill-name-row"><h3>{skill.name}</h3><b>{skill.score}%</b></div><div className="skill-bar"><i style={{width:`${skill.score}%`}}></i></div><div className="skill-bottom"><span>{skill.target}</span><div><button aria-label={`Decrease ${skill.name} progress`} onClick={() => changeSkill(skill.id, -5)}>−</button><button aria-label={`Increase ${skill.name} progress`} onClick={() => changeSkill(skill.id, 5)}>+</button></div></div></article>)}</div></section>
        <section className="internship-section"><div className="section-head"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Picked for your path <span>↗</span></h2></div><button className="subtle-link" onClick={() => setActive('Internships')}>Browse all <span>↗</span></button></div><div className="job-controls"><div className="job-filters">{['All fields','Technology','Design','Business'].map((item) => <button key={item} className={filter === item ? 'chosen' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Role, company, or skill" aria-label="Search internships"/></label></div><div className="job-list">{filtered.map((job) => <article className="job-card" key={job.id}><div className={`company-logo ${job.tone}`}>{job.logo}</div><div className="job-main"><div className="job-title-line"><h3>{job.role}</h3><span className="match">{job.match}% match</span></div><p className="company-name">{job.company} <span>·</span> {job.kind}</p><div className="job-facts"><span>⌖ {job.place}</span><span>◷ {job.mode}</span><span>₹ {job.stipend}</span></div><div className="tag-row">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="job-actions"><small>{job.posted}</small><button className={applied.includes(job.id) ? 'apply applied' : 'apply'} onClick={() => toggleItem(applied, setApplied, job.id)}>{applied.includes(job.id) ? 'Applied ✓' : 'Apply now'} <span>↗</span></button><button className={`save ${saved.includes(job.id) ? 'saved' : ''}`} aria-label={saved.includes(job.id) ? 'Remove saved internship' : 'Save internship'} onClick={() => toggleItem(saved, setSaved, job.id)}>{saved.includes(job.id) ? '♥' : '♡'}</button></div></article>)}{filtered.length === 0 && <div className="no-results">No opportunities match this search. Try a different skill or field.</div>}</div></section>
        <footer><span>pathfinder<span className="brand-dot">.</span></span><p>Build your path, one skill at a time. <b>✦</b></p><small>GROUP 7 · REACT PROJECT</small></footer>
      </div>
    </main>
    {showForm && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}><form className="skill-modal" onSubmit={addSkill}><button type="button" className="modal-close" aria-label="Close" onClick={() => setShowForm(false)}>×</button><p className="eyebrow">GROW YOUR TOOLKIT</p><h2>Add a skill</h2><p className="modal-copy">Start with something you want to learn or improve.</p><label>Skill name<input autoFocus value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="e.g. Public speaking" maxLength="35" required /></label><label>Category<select value={skillGroup} onChange={(e) => setSkillGroup(e.target.value)}><option>Development</option><option>Design</option><option>Professional</option><option>Data</option></select></label><button type="submit" className="modal-submit">Add to my skills <span>↗</span></button></form></div>}
  </div>;
}

export default App;
