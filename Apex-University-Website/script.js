/**
 * ============================================================================
 * STUDENT SEMESTER MANAGER - B.TECH CSE
 * Comprehensive JavaScript Application Logic
 * Pure Vanilla JS, No external dependencies, LocalStorage persistence
 * ============================================================================
 */

(function () {
  'use strict';

  // Key for browser LocalStorage
  const STORAGE_KEY = 'sem_desk_btech_cse_v1';

  // --------------------------------------------------------------------------
  // 1. DEFAULT DEMO DATA (B.Tech CSE Semester Curriculum)
  // --------------------------------------------------------------------------
  const DEFAULT_DEMO_DATA = {
    profile: {
      name: "Aarav Sharma",
      email: "aarav.cse21@univ.edu.in",
      rollNo: "21BCSE042",
      semester: "Semester 5",
      course: "B.Tech",
      branch: "Computer Science & Engineering",
      university: "National Institute of Technology & Engineering"
    },
    subjects: [
      {
        id: "sub-1",
        code: "CS501",
        name: "Database Management Systems",
        teacher: "Prof. Rajesh Verma",
        credits: 4,
        attended: 30,
        total: 34
      },
      {
        id: "sub-2",
        code: "CS502",
        name: "Operating Systems",
        teacher: "Dr. Ananya Sen",
        credits: 4,
        attended: 28,
        total: 36
      },
      {
        id: "sub-3",
        code: "CS503",
        name: "Computer Networks",
        teacher: "Prof. Vikram Malhotra",
        credits: 4,
        attended: 21,
        total: 32 // 65.6% -> Below 75% for testing warning!
      },
      {
        id: "sub-4",
        code: "CS504",
        name: "Theory of Computation",
        teacher: "Dr. S. N. Mukherjee",
        credits: 3,
        attended: 27,
        total: 30
      },
      {
        id: "sub-5",
        code: "CS505",
        name: "Web Technologies & Frameworks",
        teacher: "Prof. Neha Gupta",
        credits: 3,
        attended: 26,
        total: 28
      },
      {
        id: "sub-6",
        code: "CS506",
        name: "Programming in C & Data Structures Lab",
        teacher: "Er. Prateek Jain",
        credits: 2,
        attended: 14,
        total: 15
      }
    ],
    assignments: [
      {
        id: "asg-1",
        title: "Relational Algebra & Normalization Assignment (3NF/BCNF)",
        subjectId: "sub-1",
        dueDate: getRelativeDate(2),
        status: "Pending",
        priority: "Urgent",
        notes: "Solve exercises from Korth Chapter 7. Submit PDF on LMS portal."
      },
      {
        id: "asg-2",
        title: "Banker's Algorithm & Semaphore Implementation in C",
        subjectId: "sub-2",
        dueDate: getRelativeDate(4),
        status: "Pending",
        priority: "High",
        notes: "Include CPU scheduling comparison chart and test on Linux terminal."
      },
      {
        id: "asg-3",
        title: "Subnetting and CIDR Calculation Problem Sheet",
        subjectId: "sub-3",
        dueDate: getRelativeDate(-1), // Overdue for testing!
        status: "Pending",
        priority: "High",
        notes: "Class IV and Class V IP addressing cases with subnet masks."
      },
      {
        id: "asg-4",
        title: "DFA & NFA State Transition Diagram Reductions",
        subjectId: "sub-4",
        dueDate: getRelativeDate(7),
        status: "Pending",
        priority: "Normal",
        notes: "Convert regular expressions to equivalent finite state automata."
      },
      {
        id: "asg-5",
        title: "Responsive Student Dashboard Web Prototype",
        subjectId: "sub-5",
        dueDate: getRelativeDate(-3),
        status: "Completed",
        priority: "Normal",
        notes: "Frontend layout with HTML5, CSS Grid and vanilla JS."
      }
    ],
    studyTasks: [
      {
        id: "st-1",
        title: "Review B-Tree & B+ Tree Indexing in DBMS",
        subjectId: "sub-1",
        date: getTodayDateString(),
        time: "17:30",
        duration: 60,
        completed: false
      },
      {
        id: "st-2",
        title: "Deadlock Detection & Recovery algorithm notes",
        subjectId: "sub-2",
        date: getTodayDateString(),
        time: "19:00",
        duration: 45,
        completed: true
      },
      {
        id: "st-3",
        title: "Practice TCP 3-Way Handshake wireshark packet trace",
        subjectId: "sub-3",
        date: getTodayDateString(),
        time: "20:30",
        duration: 45,
        completed: false
      },
      {
        id: "st-4",
        title: "Solve Pumping Lemma problems for regular languages",
        subjectId: "sub-4",
        date: getRelativeDate(1),
        time: "18:00",
        duration: 60,
        completed: false
      }
    ],
    exams: [
      {
        id: "ex-1",
        title: "Mid-Term Examination: Operating Systems",
        subjectId: "sub-2",
        date: getRelativeDate(3),
        time: "10:30",
        room: "LH-302 (CSE Block)",
        syllabus: "Processes, Threads, CPU Scheduling, Synchronization & Deadlocks."
      },
      {
        id: "ex-2",
        title: "Mid-Term Examination: Database Systems",
        subjectId: "sub-1",
        date: getRelativeDate(5),
        time: "10:30",
        room: "LH-305 (Main Campus)",
        syllabus: "ER Modelling, Relational Schema, SQL Queries, Normalization."
      },
      {
        id: "ex-3",
        title: "Mid-Term Examination: Computer Networks",
        subjectId: "sub-3",
        date: getRelativeDate(8),
        time: "14:00",
        room: "LH-201 (CSE Lab Building)",
        syllabus: "Physical, Data Link, Network Layers, IPv4 Subnetting & Routing."
      },
      {
        id: "ex-4",
        title: "Internal Lab Assessment: C Programming & Shell",
        subjectId: "sub-6",
        date: getRelativeDate(-5),
        time: "09:00",
        room: "Computer Lab 4",
        syllabus: "Fork, Exec, Pipes, Shared Memory & Semaphore programs."
      }
    ],
    marks: [
      {
        id: "mk-1",
        subjectId: "sub-1",
        credits: 4,
        maxMarks: 100,
        obtainedMarks: 86
      },
      {
        id: "mk-2",
        subjectId: "sub-2",
        credits: 4,
        maxMarks: 100,
        obtainedMarks: 82
      },
      {
        id: "mk-3",
        subjectId: "sub-3",
        credits: 4,
        maxMarks: 100,
        obtainedMarks: 74
      },
      {
        id: "mk-4",
        subjectId: "sub-4",
        credits: 3,
        maxMarks: 100,
        obtainedMarks: 91
      },
      {
        id: "mk-5",
        subjectId: "sub-5",
        credits: 3,
        maxMarks: 100,
        obtainedMarks: 88
      },
      {
        id: "mk-6",
        subjectId: "sub-6",
        credits: 2,
        maxMarks: 100,
        obtainedMarks: 95
      }
    ],
    notes: [
      {
        id: "nt-1",
        title: "ACID Properties & Transaction States in DBMS",
        subjectId: "sub-1",
        date: getRelativeDate(-2),
        content: `ACID Properties in Database Management:

1. Atomicity: Entire transaction executes or none does (All-or-Nothing rule). Managed by Transaction Management Component.
2. Consistency: DB remains in a valid state before and after transaction. Preserves integrity constraints.
3. Isolation: Multiple transactions execute concurrently without interfering. Concurrency Control Manager handles this using 2-Phase Locking (2PL) or Timestamp ordering.
4. Durability: Once committed, updates persist even if a system crashes. Handled by Write-Ahead Logging (WAL).

Transaction States:
Active -> Partially Committed -> Committed
Active -> Failed -> Aborted`
      },
      {
        id: "nt-2",
        title: "Deadlock Conditions (Coffman Conditions) - Operating Systems",
        subjectId: "sub-2",
        date: getRelativeDate(-4),
        content: `A deadlock can occur if and only if all four Coffman conditions hold simultaneously:

1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.
2. Hold and Wait: A process must be concurrently holding at least one resource and requesting additional resources.
3. No Preemption: Resources cannot be forcibly taken from a process holding them; they must be released voluntarily.
4. Circular Wait: A closed chain of processes exists such that each process holds at least one resource needed by the next.

Handling Strategies:
- Prevention (eliminate at least one condition)
- Avoidance (Banker's Algorithm using safe states)
- Detection & Recovery (Wait-for graphs and resource killing)
- Ostrich Algorithm (ignore the issue, used by general-purpose OS)`
      },
      {
        id: "nt-3",
        title: "OSI 7 Layers vs TCP/IP Protocol Suite Comparison",
        subjectId: "sub-3",
        date: getRelativeDate(-6),
        content: `OSI 7 Layer Reference Model:
7. Application Layer: HTTP, SMTP, FTP, DNS
6. Presentation Layer: SSL/TLS, Encryption, Compression, MIME
5. Session Layer: RPC, NetBIOS, session checkpointing
4. Transport Layer: TCP (reliable, connection-oriented), UDP (unreliable, datagram)
3. Network Layer: IP, ICMP, ARP, OSPF, BGP (Routing & Logical addressing)
2. Data Link Layer: Ethernet, MAC, Framing, CRC error detection, Flow control
1. Physical Layer: Cables, Bits, Hubs, Signaling, Voltage modulation

TCP/IP Model (4 Layers):
- Application (combines OSI 5, 6, 7)
- Transport (OSI 4)
- Internet (OSI 3)
- Network Access / Host-to-Network (OSI 1 & 2)`
      }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. HELPER FUNCTIONS FOR DATES
  // --------------------------------------------------------------------------
  function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  function formatDateFriendly(dateStr) {
    if (!dateStr) return 'N/A';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function getDaysDifference(targetDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = targetDateStr.split('-');
    const target = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  // --------------------------------------------------------------------------
  // 3. APPLICATION STATE & STORAGE CONTROLLER
  // --------------------------------------------------------------------------
  let AppState = {
    profile: {},
    subjects: [],
    assignments: [],
    studyTasks: [],
    exams: [],
    marks: [],
    notes: []
  };

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        AppState = JSON.parse(stored);
        // Ensure all arrays exist
        AppState.profile = AppState.profile || DEFAULT_DEMO_DATA.profile;
        AppState.subjects = AppState.subjects || [];
        AppState.assignments = AppState.assignments || [];
        AppState.studyTasks = AppState.studyTasks || [];
        AppState.exams = AppState.exams || [];
        AppState.marks = AppState.marks || [];
        AppState.notes = AppState.notes || [];
      } else {
        // First load: seed with Demo Data
        AppState = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
        saveState();
      }
    } catch (e) {
      console.error('Failed to load from LocalStorage, loading demo data fallback', e);
      AppState = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
      refreshAllViews();
    } catch (e) {
      console.error('Failed to save to LocalStorage', e);
      showToast('Error saving data to browser storage', 'danger');
    }
  }

  function resetToDemo() {
    if (confirm('Are you sure you want to reset all data back to default B.Tech CSE demo values? Any custom entries will be replaced.')) {
      AppState = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
      saveState();
      showToast('Demo data successfully restored!', 'success');
    }
  }

  function exportBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Student_Semester_Data_${getTodayDateString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Semester data backup downloaded!', 'success');
  }

  // --------------------------------------------------------------------------
  // 4. UI TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle text-emerald';
    else if (type === 'warning') iconClass = 'fa-triangle-exclamation text-amber';
    else if (type === 'danger') iconClass = 'fa-circle-xmark text-danger';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 5. SUBJECT UTILITIES & LOOKUP
  // --------------------------------------------------------------------------
  function getSubjectById(subjectId) {
    return AppState.subjects.find(s => s.id === subjectId) || { name: 'Unknown Subject', code: 'CSE' };
  }

  function populateSubjectDropdowns() {
    const dropdownIds = [
      'assignmentSubjectSelect',
      'studyTaskSubjectSelect',
      'examSubjectSelect',
      'marksSubjectSelect',
      'noteSubjectSelect',
      'attSubjectSelect',
      'assignmentSubjectFilter',
      'noteSubjectFilter'
    ];

    dropdownIds.forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;

      const currentValue = select.value;
      const isFilter = id.includes('Filter');

      select.innerHTML = isFilter ? '<option value="all">All Subjects</option>' : '<option value="" disabled selected>-- Choose Subject --</option>';

      AppState.subjects.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub.id;
        option.textContent = `${sub.code} - ${sub.name}`;
        select.appendChild(option);
      });

      if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. DASHBOARD CALCULATIONS & RENDERING
  // --------------------------------------------------------------------------
  function renderDashboard() {
    // 1. Profile greetings
    const studentName = AppState.profile.name || "Student";
    const firstName = studentName.split(" ")[0];
    document.getElementById('heroStudentName').textContent = firstName;
    document.getElementById('heroSem').textContent = AppState.profile.semester || "Semester 5";

    // 2. Metrics: Subjects
    const totalSubjects = AppState.subjects.length;
    const totalCredits = AppState.subjects.reduce((sum, s) => sum + (parseInt(s.credits) || 0), 0);
    document.getElementById('dashTotalSubjects').textContent = totalSubjects;
    document.getElementById('dashTotalCredits').textContent = `${totalCredits} Credits Total`;

    // 3. Metrics: Assignments
    const pendingAssignments = AppState.assignments.filter(a => a.status !== 'Completed');
    let overdueCount = 0;
    pendingAssignments.forEach(a => {
      if (getDaysDifference(a.dueDate) < 0) overdueCount++;
    });
    document.getElementById('dashPendingAssignments').textContent = pendingAssignments.length;
    document.getElementById('dashOverdueAssignments').textContent = `${overdueCount} Overdue`;

    // 4. Metrics: Upcoming Exams
    const upcomingExams = AppState.exams
      .filter(e => getDaysDifference(e.date) >= 0)
      .sort((a, b) => getDaysDifference(a.date) - getDaysDifference(b.date));

    document.getElementById('dashUpcomingExams').textContent = upcomingExams.length;
    if (upcomingExams.length > 0) {
      const closestDays = getDaysDifference(upcomingExams[0].date);
      const sub = getSubjectById(upcomingExams[0].subjectId);
      document.getElementById('dashNearestExam').textContent = closestDays === 0 ? `Today: ${sub.code}` : `In ${closestDays}d: ${sub.code}`;
    } else {
      document.getElementById('dashNearestExam').textContent = 'None scheduled';
    }

    // 5. Metrics: Today's Study Progress
    const todayStr = getTodayDateString();
    const todayTasks = AppState.studyTasks.filter(t => t.date === todayStr);
    const completedTodayTasks = todayTasks.filter(t => t.completed);
    const studyPercent = todayTasks.length > 0 ? Math.round((completedTodayTasks.length / todayTasks.length) * 100) : 0;

    document.getElementById('dashStudyProgress').textContent = `${studyPercent}%`;
    document.getElementById('dashStudySummary').textContent = `${completedTodayTasks.length} of ${todayTasks.length} tasks done`;
    document.getElementById('dashStudyBarText').textContent = `${studyPercent}%`;
    document.getElementById('dashDailyStudyBar').style.width = `${studyPercent}%`;

    // 6. Overall Semester Health (Aggregate Attendance & Assignment Completion)
    let totalClassesHeld = 0;
    let totalClassesAttended = 0;
    AppState.subjects.forEach(s => {
      totalClassesHeld += parseInt(s.total) || 0;
      totalClassesAttended += parseInt(s.attended) || 0;
    });
    const avgAttendance = totalClassesHeld > 0 ? (totalClassesAttended / totalClassesHeld) * 100 : 85;

    const totalAsgn = AppState.assignments.length;
    const completedAsgn = AppState.assignments.filter(a => a.status === 'Completed').length;
    const asgnPct = totalAsgn > 0 ? (completedAsgn / totalAsgn) * 100 : 75;

    const overallHealth = Math.round((avgAttendance * 0.6) + (asgnPct * 0.4));
    document.getElementById('overallHealthScore').textContent = `${overallHealth}%`;
    document.getElementById('overallHealthBar').style.width = `${overallHealth}%`;

    // 7. Render Urgent Assignments in Panel
    renderDashboardAssignments(pendingAssignments);

    // 8. Render Today's Study Checklist in Panel
    renderDashboardStudyTasks(todayTasks);

    // 9. Render Exams in Panel
    renderDashboardExams(upcomingExams);

    // 10. Render Attendance Status in Panel
    renderDashboardAttendance();
  }

  function renderDashboardAssignments(pending) {
    const list = document.getElementById('dashPriorityAssignmentsList');
    if (!list) return;

    if (pending.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-circle-check text-emerald"></i>
          <p>Great job! All assignments completed.</p>
        </div>`;
      return;
    }

    // Sort by due date ascending
    const sorted = [...pending].sort((a, b) => getDaysDifference(a.dueDate) - getDaysDifference(b.dueDate)).slice(0, 4);

    list.innerHTML = sorted.map(a => {
      const sub = getSubjectById(a.subjectId);
      const diff = getDaysDifference(a.dueDate);
      let badgeHtml = '';

      if (diff < 0) {
        badgeHtml = `<span class="badge badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> Overdue (${Math.abs(diff)}d)</span>`;
      } else if (diff === 0) {
        badgeHtml = `<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Due Today</span>`;
      } else {
        badgeHtml = `<span class="badge badge-neutral">${diff} days left</span>`;
      }

      return `
        <div class="mini-item">
          <div class="mini-item-left">
            <button class="btn-icon text-primary" onclick="window.semManager.toggleAssignmentStatus('${a.id}')" title="Mark as Completed">
              <i class="fa-regular fa-square"></i>
            </button>
            <div class="mini-item-text">
              <h5>${escapeHtml(a.title)}</h5>
              <span><i class="fa-solid fa-book-open"></i> ${sub.code} • Due ${formatDateFriendly(a.dueDate)}</span>
            </div>
          </div>
          <div>${badgeHtml}</div>
        </div>
      `;
    }).join('');
  }

  function renderDashboardStudyTasks(tasks) {
    const list = document.getElementById('dashTodayTasksList');
    if (!list) return;

    if (tasks.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-mug-hot"></i>
          <p>No study tasks scheduled for today. Take a break or add a new goal!</p>
        </div>`;
      return;
    }

    list.innerHTML = tasks.map(t => {
      const sub = getSubjectById(t.subjectId);
      return `
        <div class="mini-item ${t.completed ? 'opacity-70' : ''}">
          <div class="mini-item-left">
            <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''} onchange="window.semManager.toggleStudyTask('${t.id}')">
            <div class="mini-item-text">
              <h5 class="${t.completed ? 'strike-title' : ''}">${escapeHtml(t.title)}</h5>
              <span><i class="fa-solid fa-clock"></i> ${t.time || 'Anytime'} • ${sub.code} (${t.duration || 45} mins)</span>
            </div>
          </div>
          <span class="badge ${t.completed ? 'badge-success' : 'badge-neutral'}">${t.completed ? 'Done' : 'Pending'}</span>
        </div>
      `;
    }).join('');
  }

  function renderDashboardExams(exams) {
    const list = document.getElementById('dashUpcomingExamsList');
    if (!list) return;

    if (exams.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-calendar-xmark"></i>
          <p>No upcoming exams right now. Enjoy the semester!</p>
        </div>`;
      return;
    }

    list.innerHTML = exams.slice(0, 3).map(e => {
      const sub = getSubjectById(e.subjectId);
      const diff = getDaysDifference(e.date);
      let countdownBadge = '';

      if (diff === 0) {
        countdownBadge = `<span class="countdown-badge today">TODAY</span>`;
      } else if (diff === 1) {
        countdownBadge = `<span class="countdown-badge today">TOMORROW</span>`;
      } else {
        countdownBadge = `<span class="countdown-badge">${diff} Days Left</span>`;
      }

      return `
        <div class="mini-item">
          <div class="mini-item-left">
            <div class="mini-item-text">
              <h5>${escapeHtml(e.title)}</h5>
              <span><i class="fa-solid fa-book"></i> ${sub.name} (${sub.code}) • Room: ${e.room || 'TBD'}</span>
            </div>
          </div>
          <div>${countdownBadge}</div>
        </div>
      `;
    }).join('');
  }

  function renderDashboardAttendance() {
    const container = document.getElementById('dashAttendanceStatusContainer');
    if (!container) return;

    const subjectsAtRisk = AppState.subjects.filter(s => {
      const total = parseInt(s.total) || 0;
      const attended = parseInt(s.attended) || 0;
      if (total === 0) return false;
      return ((attended / total) * 100) < 75;
    });

    if (subjectsAtRisk.length === 0) {
      container.innerHTML = `
        <div class="compliance-alert-box mb-0">
          <i class="fa-solid fa-shield-check text-emerald"></i>
          <div>
            <strong>All Good!</strong> Your attendance in every registered CSE subject is comfortably above the university 75% threshold. Keep it up!
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="compliance-alert-box alert-danger-zone mb-2">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div>
            <strong>Attendance Shortage Warning:</strong> You have <strong>${subjectsAtRisk.length}</strong> subject(s) below the mandatory 75% limit.
          </div>
        </div>
        <div class="mini-list">
          ${subjectsAtRisk.map(s => {
            const pct = (((s.attended || 0) / (s.total || 1)) * 100).toFixed(1);
            const needed = calculateClassesNeeded(s.attended || 0, s.total || 1);
            return `
              <div class="mini-item">
                <div class="mini-item-text">
                  <h5>${s.code} - ${s.name}</h5>
                  <span class="text-danger">Attended: ${s.attended}/${s.total} (${pct}%) • <strong>Must attend next ${needed} classes</strong></span>
                </div>
                <button class="btn btn-sm btn-primary" onclick="window.semManager.logAttendance('${s.id}', true)">+1 Attended</button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 7. SUBJECTS MANAGEMENT VIEW
  // --------------------------------------------------------------------------
  function renderSubjectsView() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;

    const searchKeyword = (document.getElementById('subjectSearchInput').value || '').toLowerCase();
    const creditFilter = document.getElementById('subjectCreditFilter').value;

    const filtered = AppState.subjects.filter(sub => {
      const matchText = sub.name.toLowerCase().includes(searchKeyword) || sub.code.toLowerCase().includes(searchKeyword) || (sub.teacher && sub.teacher.toLowerCase().includes(searchKeyword));
      const matchCredit = creditFilter === 'all' || parseInt(sub.credits) === parseInt(creditFilter);
      return matchText && matchCredit;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-book-open"></i>
          <p>No subjects found matching your criteria. Click "Add New Subject" to create one.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(sub => {
      const total = parseInt(sub.total) || 0;
      const attended = parseInt(sub.attended) || 0;
      const pct = total > 0 ? ((attended / total) * 100).toFixed(1) : '100.0';
      const isLow = parseFloat(pct) < 75;

      return `
        <div class="subject-card">
          <div>
            <div class="subject-top">
              <span class="subject-code-badge">${escapeHtml(sub.code)}</span>
              <div class="subject-actions">
                <button class="btn-icon text-primary" onclick="window.semManager.openEditSubject('${sub.id}')" title="Edit Subject">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn-icon text-danger" onclick="window.semManager.deleteSubject('${sub.id}')" title="Delete Subject">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <h3>${escapeHtml(sub.name)}</h3>
            <div class="subject-teacher">
              <i class="fa-solid fa-chalkboard-user"></i>
              <span>${escapeHtml(sub.teacher || 'Faculty Advisor')}</span>
            </div>

            <div class="subject-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Course Credits</span>
                <span class="meta-val">${sub.credits} Credits</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Classes Attended</span>
                <span class="meta-val">${attended} / ${total}</span>
              </div>
            </div>
          </div>

          <div class="subject-attd-status">
            <div class="d-flex justify-between text-sm">
              <span>Attendance Rate</span>
              <strong class="${isLow ? 'text-danger' : 'text-emerald'}">${pct}%</strong>
            </div>
            <div class="meter-bar-container">
              <div class="meter-fill ${isLow ? 'bg-rose' : 'bg-emerald-bar'}" style="width: ${Math.min(parseFloat(pct), 100)}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 8. ATTENDANCE TRACKER VIEW & SMART CALCULATOR
  // --------------------------------------------------------------------------
  /**
   * Smart B.Tech CSE Attendance Formulas:
   * Rule: Attended / Total >= 0.75
   * 1) If < 75%:
   *    (Attended + x) / (Total + x) >= 0.75
   *    Attended + x >= 0.75 Total + 0.75 x
   *    0.25 x >= 0.75 Total - Attended
   *    x >= 3 * Total - 4 * Attended
   * 2) If >= 75%:
   *    Attended / (Total + y) >= 0.75
   *    Attended >= 0.75 Total + 0.75 y
   *    0.75 y <= Attended - 0.75 Total
   *    y <= (4 * Attended - 3 * Total) / 3
   */
  function calculateClassesNeeded(attended, total) {
    if (total === 0) return 0;
    const x = Math.ceil(3 * total - 4 * attended);
    return x > 0 ? x : 0;
  }

  function calculateClassesCanMiss(attended, total) {
    if (total === 0) return 0;
    const y = Math.floor((4 * attended - 3 * total) / 3);
    return y > 0 ? y : 0;
  }

  function renderAttendanceView() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;

    let totalHeldAll = 0;
    let totalAttendedAll = 0;
    let shortageCount = 0;

    if (AppState.subjects.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <i class="fa-solid fa-clipboard-user"></i>
            <p>No subjects added yet. Add subjects to start tracking attendance.</p>
          </td>
        </tr>
      `;
      document.getElementById('attTotalClasses').textContent = '0';
      document.getElementById('attAttendedClasses').textContent = '0';
      document.getElementById('attOverallPercent').textContent = '0.0%';
      document.getElementById('attShortageCount').textContent = '0';
      return;
    }

    tbody.innerHTML = AppState.subjects.map(sub => {
      const total = parseInt(sub.total) || 0;
      const attended = parseInt(sub.attended) || 0;
      totalHeldAll += total;
      totalAttendedAll += attended;

      const pct = total > 0 ? ((attended / total) * 100).toFixed(1) : '100.0';
      const numPct = parseFloat(pct);
      const isLow = numPct < 75;

      if (isLow) shortageCount++;

      let analysisHtml = '';
      if (isLow) {
        const needed = calculateClassesNeeded(attended, total);
        analysisHtml = `<span class="text-danger font-medium"><i class="fa-solid fa-triangle-exclamation"></i> Must attend next <strong>${needed}</strong> lectures without absence</span>`;
      } else {
        const canMiss = calculateClassesCanMiss(attended, total);
        analysisHtml = canMiss > 0
          ? `<span class="text-emerald font-medium"><i class="fa-solid fa-shield-check"></i> Safe zone: Can afford to bunk <strong>${canMiss}</strong> class(es)</span>`
          : `<span class="text-emerald font-medium"><i class="fa-solid fa-check"></i> On the edge (75%). Do not miss the next class!</span>`;
      }

      return `
        <tr>
          <td>
            <strong>${escapeHtml(sub.name)}</strong>
            <div class="text-sm text-muted">${escapeHtml(sub.code)} • ${sub.teacher || 'Faculty'}</div>
          </td>
          <td><strong>${attended}</strong> / ${total}</td>
          <td>
            <div class="d-flex align-center gap-2">
              <span class="font-bold ${isLow ? 'text-danger' : 'text-emerald'}">${pct}%</span>
              <div class="meter-bar-container" style="width: 70px;">
                <div class="meter-fill ${isLow ? 'bg-rose' : 'bg-emerald-bar'}" style="width: ${Math.min(numPct, 100)}%;"></div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge ${isLow ? 'badge-danger' : 'badge-success'}">
              ${isLow ? '<i class="fa-solid fa-xmark"></i> Shortage' : '<i class="fa-solid fa-check"></i> Eligible'}
            </span>
          </td>
          <td>${analysisHtml}</td>
          <td>
            <div class="quick-attd-btn-group">
              <button class="btn-quick-attd btn-present" onclick="window.semManager.logAttendance('${sub.id}', true)" title="Attended today's class">+1 Attended</button>
              <button class="btn-quick-attd btn-absent" onclick="window.semManager.logAttendance('${sub.id}', false)" title="Missed today's class">+1 Missed</button>
            </div>
          </td>
          <td>
            <button class="btn-icon text-primary" onclick="window.semManager.openEditAttendanceModal('${sub.id}')" title="Adjust numbers">
              <i class="fa-solid fa-sliders"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Update banner metrics
    document.getElementById('attTotalClasses').textContent = totalHeldAll;
    document.getElementById('attAttendedClasses').textContent = totalAttendedAll;
    const overallPct = totalHeldAll > 0 ? ((totalAttendedAll / totalHeldAll) * 100).toFixed(1) : '0.0';
    document.getElementById('attOverallPercent').textContent = `${overallPct}%`;
    document.getElementById('attShortageCount').textContent = shortageCount;

    // Topbar and navigation alert dots
    document.getElementById('topbarAvgAttendance').textContent = `${overallPct}%`;
    const navWarning = document.getElementById('navAttendanceWarning');
    if (navWarning) {
      navWarning.style.display = shortageCount > 0 ? 'inline-block' : 'none';
    }
  }

  // --------------------------------------------------------------------------
  // 9. ASSIGNMENTS VIEW & TRACKER
  // --------------------------------------------------------------------------
  let currentAssignmentTab = 'all';

  function renderAssignmentsView() {
    const tbody = document.getElementById('assignmentsTableBody');
    if (!tbody) return;

    const searchKeyword = (document.getElementById('assignmentSearchInput').value || '').toLowerCase();
    const subjectFilter = document.getElementById('assignmentSubjectFilter').value;

    // Counts for tabs
    const allCount = AppState.assignments.length;
    const pendingCount = AppState.assignments.filter(a => a.status === 'Pending').length;
    const completedCount = AppState.assignments.filter(a => a.status === 'Completed').length;
    let overdueCount = 0;

    AppState.assignments.forEach(a => {
      if (a.status === 'Pending' && getDaysDifference(a.dueDate) < 0) {
        overdueCount++;
      }
    });

    document.getElementById('countAllAssignments').textContent = allCount;
    document.getElementById('countPendingAssignments').textContent = pendingCount;
    document.getElementById('countCompletedAssignments').textContent = completedCount;
    document.getElementById('countOverdueAssignments').textContent = overdueCount;
    document.getElementById('navPendingAssignmentCount').textContent = pendingCount;

    // Filter list
    const filtered = AppState.assignments.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(searchKeyword) || (a.notes && a.notes.toLowerCase().includes(searchKeyword));
      const matchSub = subjectFilter === 'all' || a.subjectId === subjectFilter;

      let matchTab = true;
      if (currentAssignmentTab === 'pending') matchTab = (a.status === 'Pending');
      else if (currentAssignmentTab === 'completed') matchTab = (a.status === 'Completed');
      else if (currentAssignmentTab === 'overdue') matchTab = (a.status === 'Pending' && getDaysDifference(a.dueDate) < 0);

      return matchSearch && matchSub && matchTab;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <i class="fa-solid fa-clipboard-check"></i>
            <p>No assignments found in this view.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(a => {
      const sub = getSubjectById(a.subjectId);
      const isCompleted = a.status === 'Completed';
      const diff = getDaysDifference(a.dueDate);

      let remainingHtml = '';
      if (isCompleted) {
        remainingHtml = `<span class="text-emerald"><i class="fa-solid fa-check"></i> Finished</span>`;
      } else if (diff < 0) {
        remainingHtml = `<span class="text-danger font-bold"><i class="fa-solid fa-circle-exclamation"></i> Overdue by ${Math.abs(diff)}d</span>`;
      } else if (diff === 0) {
        remainingHtml = `<span class="text-amber font-bold"><i class="fa-solid fa-clock"></i> Due Today!</span>`;
      } else {
        remainingHtml = `<span class="text-muted font-medium">${diff} days left</span>`;
      }

      let priorityBadge = '';
      if (a.priority === 'Urgent') priorityBadge = `<span class="badge badge-danger">Urgent</span>`;
      else if (a.priority === 'High') priorityBadge = `<span class="badge badge-warning">High</span>`;
      else priorityBadge = `<span class="badge badge-neutral">Normal</span>`;

      return `
        <tr>
          <td>
            <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} onchange="window.semManager.toggleAssignmentStatus('${a.id}')">
          </td>
          <td>
            <strong class="${isCompleted ? 'strike-title' : ''}">${escapeHtml(a.title)}</strong>
            ${a.notes ? `<div class="text-sm text-muted mt-1"><i class="fa-regular fa-message"></i> ${escapeHtml(a.notes)}</div>` : ''}
          </td>
          <td>
            <span class="badge badge-info">${escapeHtml(sub.code)}</span>
            <div class="text-sm text-muted mt-1">${escapeHtml(sub.name)}</div>
          </td>
          <td>${formatDateFriendly(a.dueDate)}</td>
          <td>${remainingHtml}</td>
          <td>
            <span class="badge ${isCompleted ? 'badge-success' : 'badge-warning'}">
              ${isCompleted ? 'Completed' : 'Pending'}
            </span>
            ${priorityBadge}
          </td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn-icon text-primary" onclick="window.semManager.openEditAssignment('${a.id}')" title="Edit Assignment">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon text-danger" onclick="window.semManager.deleteAssignment('${a.id}')" title="Delete Assignment">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 10. STUDY PLANNER VIEW
  // --------------------------------------------------------------------------
  let currentStudyDate = getTodayDateString();

  function renderStudyPlannerView() {
    const container = document.getElementById('studyTasksContainer');
    if (!container) return;

    const dateInput = document.getElementById('studyPlannerDateFilter');
    if (dateInput && dateInput.value !== currentStudyDate) {
      dateInput.value = currentStudyDate;
    }

    const tasksForDay = AppState.studyTasks.filter(t => t.date === currentStudyDate);
    const completedTasks = tasksForDay.filter(t => t.completed);
    const pct = tasksForDay.length > 0 ? Math.round((completedTasks.length / tasksForDay.length) * 100) : 0;

    document.getElementById('studyDayProgressBar').style.width = `${pct}%`;
    document.getElementById('studyDayProgressText').textContent = `${pct}%`;
    document.getElementById('studyDayCountBadge').textContent = `${tasksForDay.length} task(s) for ${formatDateFriendly(currentStudyDate)}`;

    if (tasksForDay.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-calendar-plus"></i>
          <p>No study blocks scheduled for this day. Click "Add Study Task" above to plan a revision session.</p>
        </div>
      `;
      return;
    }

    // Sort by time
    const sorted = [...tasksForDay].sort((a, b) => (a.time || '00:00').localeCompare(b.time || '00:00'));

    container.innerHTML = sorted.map(t => {
      const sub = getSubjectById(t.subjectId);
      return `
        <div class="study-task-card ${t.completed ? 'completed' : ''}">
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''} onchange="window.semManager.toggleStudyTask('${t.id}')">
            <div class="task-details">
              <h4 class="${t.completed ? 'strike-title' : ''}">${escapeHtml(t.title)}</h4>
              <div class="task-meta">
                <span><i class="fa-solid fa-book"></i> ${escapeHtml(sub.code)} - ${escapeHtml(sub.name)}</span>
                <span><i class="fa-regular fa-clock"></i> ${t.time || 'Flexible'} (${t.duration || 45} mins)</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-center gap-2">
            <span class="badge ${t.completed ? 'badge-success' : 'badge-neutral'}">${t.completed ? 'Completed' : 'Pending'}</span>
            <button class="btn-icon text-danger" onclick="window.semManager.deleteStudyTask('${t.id}')" title="Delete Task">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 11. EXAMS & TEST VIEW
  // --------------------------------------------------------------------------
  function renderExamsView() {
    const container = document.getElementById('examsContainer');
    if (!container) return;

    const searchKeyword = (document.getElementById('examSearchInput').value || '').toLowerCase();
    const filterType = document.getElementById('examFilterType').value;

    const filtered = AppState.exams.filter(e => {
      const sub = getSubjectById(e.subjectId);
      const matchSearch = e.title.toLowerCase().includes(searchKeyword) || sub.name.toLowerCase().includes(searchKeyword) || (e.room && e.room.toLowerCase().includes(searchKeyword));
      const diff = getDaysDifference(e.date);

      let matchFilter = true;
      if (filterType === 'upcoming') matchFilter = diff >= 0;
      else if (filterType === 'completed') matchFilter = diff < 0;

      return matchSearch && matchFilter;
    });

    document.getElementById('navExamCount').textContent = AppState.exams.filter(e => getDaysDifference(e.date) >= 0).length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-calendar-check"></i>
          <p>No exams or assessments found. Schedule an exam using the button above.</p>
        </div>
      `;
      return;
    }

    // Sort by date ascending
    const sorted = [...filtered].sort((a, b) => getDaysDifference(a.date) - getDaysDifference(b.date));

    container.innerHTML = sorted.map(e => {
      const sub = getSubjectById(e.subjectId);
      const diff = getDaysDifference(e.date);

      let countdownBadge = '';
      if (diff < 0) {
        countdownBadge = `<span class="countdown-badge done"><i class="fa-solid fa-check"></i> Completed (${Math.abs(diff)}d ago)</span>`;
      } else if (diff === 0) {
        countdownBadge = `<span class="countdown-badge today"><i class="fa-solid fa-bell"></i> HAPPENING TODAY!</span>`;
      } else if (diff === 1) {
        countdownBadge = `<span class="countdown-badge today"><i class="fa-solid fa-clock"></i> TOMORROW</span>`;
      } else {
        countdownBadge = `<span class="countdown-badge">${diff} Days Left</span>`;
      }

      return `
        <div class="exam-card">
          <div>
            <div class="exam-header">
              <span class="subject-code-badge">${escapeHtml(sub.code)}</span>
              <div>${countdownBadge}</div>
            </div>

            <h3>${escapeHtml(e.title)}</h3>
            <span class="exam-subject-sub">${escapeHtml(sub.name)}</span>

            <ul class="exam-details-list">
              <li><i class="fa-regular fa-calendar text-primary"></i> <strong>Date:</strong> ${formatDateFriendly(e.date)}</li>
              <li><i class="fa-regular fa-clock text-primary"></i> <strong>Time:</strong> ${e.time || '10:00 AM'}</li>
              <li><i class="fa-solid fa-location-dot text-primary"></i> <strong>Hall/Room:</strong> ${escapeHtml(e.room || 'Main CSE Exam Hall')}</li>
            </ul>

            ${e.syllabus ? `
              <div class="exam-syllabus-box">
                <strong>Syllabus Scope:</strong> ${escapeHtml(e.syllabus)}
              </div>
            ` : ''}
          </div>

          <div class="d-flex justify-between align-center mt-3 pt-3" style="border-top: 1px solid var(--border-color);">
            <span class="text-sm text-muted">B.Tech Assessment</span>
            <div class="d-flex gap-2">
              <button class="btn-icon text-primary" onclick="window.semManager.openEditExam('${e.id}')" title="Edit Exam">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon text-danger" onclick="window.semManager.deleteExam('${e.id}')" title="Delete Exam">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 12. MARKS & CGPA / SGPA CALCULATOR
  // --------------------------------------------------------------------------
  /**
   * UGC / AICTE 10-Point Grading Scale:
   * 90% - 100% -> O (Outstanding) = 10
   * 80% - 89.9% -> A+ (Excellent)   = 9
   * 70% - 79.9% -> A (Very Good)   = 8
   * 60% - 69.9% -> B+ (Good)        = 7
   * 55% - 59.9% -> B (Above Avg)   = 6
   * 50% - 54.9% -> C (Average)     = 5
   * 40% - 49.9% -> P (Pass)        = 4
   * Below 40%   -> F (Fail)        = 0
   */
  function calculateGradePoint(percentage) {
    if (percentage >= 90) return { grade: 'O', point: 10 };
    if (percentage >= 80) return { grade: 'A+', point: 9 };
    if (percentage >= 70) return { grade: 'A', point: 8 };
    if (percentage >= 60) return { grade: 'B+', point: 7 };
    if (percentage >= 55) return { grade: 'B', point: 6 };
    if (percentage >= 50) return { grade: 'C', point: 5 };
    if (percentage >= 40) return { grade: 'P', point: 4 };
    return { grade: 'F', point: 0 };
  }

  function renderMarksView() {
    const tbody = document.getElementById('marksTableBody');
    if (!tbody) return;

    if (AppState.marks.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <i class="fa-solid fa-calculator"></i>
            <p>No marks entered yet. Click "Add Subject Marks" to estimate your semester GPA.</p>
          </td>
        </tr>
      `;
      document.getElementById('calculatedCGPA').textContent = '0.00';
      document.getElementById('calcTotalMarks').textContent = '0 / 0';
      document.getElementById('calcAvgPercentage').textContent = '0.0%';
      document.getElementById('calcTotalCredits').textContent = '0';
      document.getElementById('calcGradeClassification').textContent = '-';
      return;
    }

    let totalEarnedCreditPoints = 0;
    let totalCredits = 0;
    let totalObtainedMarks = 0;
    let totalMaxMarks = 0;

    tbody.innerHTML = AppState.marks.map(m => {
      const sub = getSubjectById(m.subjectId);
      const credits = parseInt(m.credits) || 3;
      const maxMarks = parseFloat(m.maxMarks) || 100;
      const obtained = parseFloat(m.obtainedMarks) || 0;

      const pct = maxMarks > 0 ? (obtained / maxMarks) * 100 : 0;
      const { grade, point } = calculateGradePoint(pct);
      const creditPoint = (credits * point);

      totalCredits += credits;
      totalEarnedCreditPoints += creditPoint;
      totalObtainedMarks += obtained;
      totalMaxMarks += maxMarks;

      return `
        <tr>
          <td>
            <strong>${escapeHtml(sub.name)}</strong>
            <div class="text-sm text-muted">${escapeHtml(sub.code)}</div>
          </td>
          <td><strong>${credits}</strong></td>
          <td>${maxMarks}</td>
          <td><strong>${obtained}</strong></td>
          <td>${pct.toFixed(1)}%</td>
          <td>
            <span class="badge ${point >= 8 ? 'badge-success' : (point >= 6 ? 'badge-warning' : 'badge-danger')}">
              ${grade} (${point})
            </span>
          </td>
          <td><strong>${creditPoint}</strong></td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn-icon text-primary" onclick="window.semManager.openEditMarks('${m.id}')" title="Edit Marks">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon text-danger" onclick="window.semManager.deleteMarks('${m.id}')" title="Delete Marks">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Semester SGPA Calculation: Sum(Credits * GradePoint) / Sum(Credits)
    const sgpa = totalCredits > 0 ? (totalEarnedCreditPoints / totalCredits).toFixed(2) : '0.00';
    const overallPct = totalMaxMarks > 0 ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(1) : '0.0';

    document.getElementById('calculatedCGPA').textContent = sgpa;
    document.getElementById('calcTotalMarks').textContent = `${totalObtainedMarks} / ${totalMaxMarks}`;
    document.getElementById('calcAvgPercentage').textContent = `${overallPct}%`;
    document.getElementById('calcTotalCredits').textContent = totalCredits;

    // Classification
    let classification = 'First Class with Distinction';
    const numSgpa = parseFloat(sgpa);
    if (numSgpa >= 8.5) classification = 'First Class with Distinction (Honors)';
    else if (numSgpa >= 7.0) classification = 'First Class';
    else if (numSgpa >= 6.0) classification = 'Second Class';
    else if (numSgpa >= 4.0) classification = 'Pass Division';
    else classification = 'Needs Improvement';

    document.getElementById('calcGradeClassification').textContent = classification;
  }

  // --------------------------------------------------------------------------
  // 13. NOTES SECTION VIEW
  // --------------------------------------------------------------------------
  function renderNotesView() {
    const container = document.getElementById('notesContainer');
    if (!container) return;

    const searchKeyword = (document.getElementById('noteSearchInput').value || '').toLowerCase();
    const subjectFilter = document.getElementById('noteSubjectFilter').value;

    const filtered = AppState.notes.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchKeyword) || n.content.toLowerCase().includes(searchKeyword);
      const matchSub = subjectFilter === 'all' || n.subjectId === subjectFilter;
      return matchSearch && matchSub;
    });

    document.getElementById('navNotesCount').textContent = AppState.notes.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-book-bookmark"></i>
          <p>No study notes found. Write your first summary note using the button above.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(n => {
      const sub = getSubjectById(n.subjectId);
      return `
        <div class="note-card" onclick="window.semManager.viewFullNote('${n.id}')">
          <div>
            <div class="note-card-top">
              <span class="subject-code-badge">${escapeHtml(sub.code)}</span>
              <div class="d-flex gap-1" onclick="event.stopPropagation()">
                <button class="btn-icon text-primary" onclick="window.semManager.openEditNote('${n.id}')" title="Edit Note">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon text-danger" onclick="window.semManager.deleteNote('${n.id}')" title="Delete Note">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <h3>${escapeHtml(n.title)}</h3>
            <p class="note-snippet">${escapeHtml(n.content)}</p>
          </div>

          <div class="note-footer">
            <span><i class="fa-solid fa-book"></i> ${escapeHtml(sub.name)}</span>
            <span><i class="fa-regular fa-clock"></i> ${formatDateFriendly(n.date || getTodayDateString())}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 14. STUDENT PROFILE VIEW
  // --------------------------------------------------------------------------
  function renderProfileView() {
    const prof = AppState.profile;

    // Header & Cards
    const initials = (prof.name || 'AS')
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('topbarAvatar').textContent = initials;
    document.getElementById('profileLargeAvatar').textContent = initials;

    document.getElementById('sidebarStudentName').textContent = prof.name || 'Aarav Sharma';
    document.getElementById('sidebarSemBadge').textContent = `${prof.semester || 'Semester 5'} • CSE`;

    document.getElementById('profileDisplayName').textContent = prof.name || 'Aarav Sharma';
    document.getElementById('profileDisplayRoll').textContent = `Roll / ID: ${prof.rollNo || '21BCSE042'}`;
    document.getElementById('profileDisplaySem').textContent = prof.semester || 'Semester 5';

    document.getElementById('profileSubCount').textContent = AppState.subjects.length;
    document.getElementById('profileAssgnDone').textContent = AppState.assignments.filter(a => a.status === 'Completed').length;

    // Overall attendance
    let totalHeld = 0, totalAttd = 0;
    AppState.subjects.forEach(s => {
      totalHeld += parseInt(s.total) || 0;
      totalAttd += parseInt(s.attended) || 0;
    });
    const avgPct = totalHeld > 0 ? ((totalAttd / totalHeld) * 100).toFixed(1) : '0.0';
    document.getElementById('profileAttdPct').textContent = `${avgPct}%`;

    // Populate Form Inputs
    document.getElementById('profName').value = prof.name || '';
    document.getElementById('profEmail').value = prof.email || '';
    document.getElementById('profRoll').value = prof.rollNo || '';
    document.getElementById('profSemester').value = prof.semester || 'Semester 5';
    document.getElementById('profCourse').value = prof.course || 'B.Tech';
    document.getElementById('profBranch').value = prof.branch || 'Computer Science & Engineering';
    document.getElementById('profUniversity').value = prof.university || '';
  }

  // --------------------------------------------------------------------------
  // 15. REFRESH ALL VIEWS COORDINATOR
  // --------------------------------------------------------------------------
  function refreshAllViews() {
    populateSubjectDropdowns();
    renderDashboard();
    renderSubjectsView();
    renderAttendanceView();
    renderAssignmentsView();
    renderStudyPlannerView();
    renderExamsView();
    renderMarksView();
    renderNotesView();
    renderProfileView();

    // Counts in sidebar
    document.getElementById('navSubjectCount').textContent = AppState.subjects.length;
  }

  // --------------------------------------------------------------------------
  // 16. MODAL SYSTEM CONTROLS
  // --------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  function setupModalDismissals() {
    // Backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });

    // Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        closeModal(modalId);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 17. PUBLIC CONTROLLER ACTIONS (WINDOW.SEMMANAGER)
  // --------------------------------------------------------------------------
  window.semManager = {
    // Subject Actions
    openAddSubject: function () {
      document.getElementById('subjectForm').reset();
      document.getElementById('subjectFormId').value = '';
      document.getElementById('subjectModalTitle').innerHTML = '<i class="fa-solid fa-book"></i> Add New Subject';
      openModal('subjectModal');
    },

    openEditSubject: function (id) {
      const sub = AppState.subjects.find(s => s.id === id);
      if (!sub) return;

      document.getElementById('subjectFormId').value = sub.id;
      document.getElementById('subjectNameInput').value = sub.name;
      document.getElementById('subjectCodeInput').value = sub.code;
      document.getElementById('subjectCreditsInput').value = sub.credits;
      document.getElementById('subjectTeacherInput').value = sub.teacher || '';
      document.getElementById('subjectAttendedInput').value = sub.attended || 0;
      document.getElementById('subjectTotalInput').value = sub.total || 0;

      document.getElementById('subjectModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Subject';
      openModal('subjectModal');
    },

    deleteSubject: function (id) {
      if (confirm('Are you sure you want to delete this subject? Linked assignments and attendance data will also be removed.')) {
        AppState.subjects = AppState.subjects.filter(s => s.id !== id);
        AppState.assignments = AppState.assignments.filter(a => a.subjectId !== id);
        AppState.studyTasks = AppState.studyTasks.filter(t => t.subjectId !== id);
        AppState.exams = AppState.exams.filter(e => e.subjectId !== id);
        AppState.marks = AppState.marks.filter(m => m.subjectId !== id);
        AppState.notes = AppState.notes.filter(n => n.subjectId !== id);
        saveState();
        showToast('Subject deleted successfully', 'warning');
      }
    },

    // Attendance Actions
    logAttendance: function (subjectId, attendedToday) {
      const sub = AppState.subjects.find(s => s.id === subjectId);
      if (!sub) return;

      sub.total = (parseInt(sub.total) || 0) + 1;
      if (attendedToday) {
        sub.attended = (parseInt(sub.attended) || 0) + 1;
        showToast(`Attendance marked Present for ${sub.code}`, 'success');
      } else {
        showToast(`Marked Absent for ${sub.code}`, 'warning');
      }
      saveState();
    },

    openEditAttendanceModal: function (subjectId) {
      const sub = AppState.subjects.find(s => s.id === subjectId);
      if (!sub) return;
      document.getElementById('attSubjectSelect').value = sub.id;
      document.getElementById('attClassesAttended').value = sub.attended || 0;
      document.getElementById('attTotalClassesInput').value = sub.total || 0;
      openModal('attendanceModal');
    },

    // Assignment Actions
    openAddAssignment: function () {
      if (AppState.subjects.length === 0) {
        showToast('Please add at least one subject first!', 'warning');
        return;
      }
      document.getElementById('assignmentForm').reset();
      document.getElementById('assignmentFormId').value = '';
      document.getElementById('assignmentDueDateInput').value = getRelativeDate(3);
      document.getElementById('assignmentModalTitle').innerHTML = '<i class="fa-solid fa-list-check"></i> Add Assignment';
      openModal('assignmentModal');
    },

    openEditAssignment: function (id) {
      const asg = AppState.assignments.find(a => a.id === id);
      if (!asg) return;

      document.getElementById('assignmentFormId').value = asg.id;
      document.getElementById('assignmentTitleInput').value = asg.title;
      document.getElementById('assignmentSubjectSelect').value = asg.subjectId;
      document.getElementById('assignmentDueDateInput').value = asg.dueDate;
      document.getElementById('assignmentStatusSelect').value = asg.status;
      document.getElementById('assignmentPrioritySelect').value = asg.priority || 'Normal';
      document.getElementById('assignmentDescInput').value = asg.notes || '';

      document.getElementById('assignmentModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Assignment';
      openModal('assignmentModal');
    },

    toggleAssignmentStatus: function (id) {
      const asg = AppState.assignments.find(a => a.id === id);
      if (!asg) return;

      asg.status = asg.status === 'Completed' ? 'Pending' : 'Completed';
      saveState();
      showToast(asg.status === 'Completed' ? 'Assignment marked as completed!' : 'Assignment moved back to pending', 'success');
    },

    deleteAssignment: function (id) {
      if (confirm('Delete this assignment?')) {
        AppState.assignments = AppState.assignments.filter(a => a.id !== id);
        saveState();
        showToast('Assignment deleted', 'info');
      }
    },

    // Study Tasks Actions
    openAddStudyTask: function () {
      if (AppState.subjects.length === 0) {
        showToast('Please add a subject first!', 'warning');
        return;
      }
      document.getElementById('studyTaskForm').reset();
      document.getElementById('studyTaskFormId').value = '';
      document.getElementById('studyTaskDateInput').value = currentStudyDate;
      document.getElementById('studyTaskModalTitle').innerHTML = '<i class="fa-solid fa-calendar-check"></i> Add Study Task';
      openModal('studyTaskModal');
    },

    toggleStudyTask: function (id) {
      const task = AppState.studyTasks.find(t => t.id === id);
      if (!task) return;

      task.completed = !task.completed;
      saveState();
    },

    deleteStudyTask: function (id) {
      AppState.studyTasks = AppState.studyTasks.filter(t => t.id !== id);
      saveState();
      showToast('Study task removed', 'info');
    },

    // Exam Actions
    openAddExam: function () {
      if (AppState.subjects.length === 0) {
        showToast('Please add a subject first!', 'warning');
        return;
      }
      document.getElementById('examForm').reset();
      document.getElementById('examFormId').value = '';
      document.getElementById('examDateInput').value = getRelativeDate(5);
      document.getElementById('examModalTitle').innerHTML = '<i class="fa-solid fa-stopwatch"></i> Schedule Exam / Test';
      openModal('examModal');
    },

    openEditExam: function (id) {
      const ex = AppState.exams.find(e => e.id === id);
      if (!ex) return;

      document.getElementById('examFormId').value = ex.id;
      document.getElementById('examNameInput').value = ex.title;
      document.getElementById('examSubjectSelect').value = ex.subjectId;
      document.getElementById('examDateInput').value = ex.date;
      document.getElementById('examTimeInput').value = ex.time || '10:00';
      document.getElementById('examRoomInput').value = ex.room || '';
      document.getElementById('examSyllabusInput').value = ex.syllabus || '';

      document.getElementById('examModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Exam';
      openModal('examModal');
    },

    deleteExam: function (id) {
      if (confirm('Delete this exam entry?')) {
        AppState.exams = AppState.exams.filter(e => e.id !== id);
        saveState();
        showToast('Exam removed from schedule', 'info');
      }
    },

    // Marks Actions
    openAddMarks: function () {
      if (AppState.subjects.length === 0) {
        showToast('Please add subjects first!', 'warning');
        return;
      }
      document.getElementById('marksForm').reset();
      document.getElementById('marksFormId').value = '';
      document.getElementById('marksModalTitle').innerHTML = '<i class="fa-solid fa-calculator"></i> Add Subject Marks';
      openModal('marksModal');
    },

    openEditMarks: function (id) {
      const mk = AppState.marks.find(m => m.id === id);
      if (!mk) return;

      document.getElementById('marksFormId').value = mk.id;
      document.getElementById('marksSubjectSelect').value = mk.subjectId;
      document.getElementById('marksCreditsInput').value = mk.credits;
      document.getElementById('marksMaxInput').value = mk.maxMarks;
      document.getElementById('marksObtainedInput').value = mk.obtainedMarks;

      document.getElementById('marksModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Subject Marks';
      openModal('marksModal');
    },

    deleteMarks: function (id) {
      if (confirm('Delete this marks entry?')) {
        AppState.marks = AppState.marks.filter(m => m.id !== id);
        saveState();
        showToast('Marks entry removed', 'info');
      }
    },

    // Notes Actions
    openAddNote: function () {
      if (AppState.subjects.length === 0) {
        showToast('Please add a subject first!', 'warning');
        return;
      }
      document.getElementById('noteForm').reset();
      document.getElementById('noteFormId').value = '';
      document.getElementById('noteModalTitle').innerHTML = '<i class="fa-solid fa-note-sticky"></i> Write Study Note';
      openModal('noteModal');
    },

    openEditNote: function (id) {
      const n = AppState.notes.find(note => note.id === id);
      if (!n) return;

      document.getElementById('noteFormId').value = n.id;
      document.getElementById('noteTitleInput').value = n.title;
      document.getElementById('noteSubjectSelect').value = n.subjectId;
      document.getElementById('noteContentInput').value = n.content;

      document.getElementById('noteModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Study Note';
      closeModal('viewNoteModal');
      openModal('noteModal');
    },

    viewFullNote: function (id) {
      const n = AppState.notes.find(note => note.id === id);
      if (!n) return;

      const sub = getSubjectById(n.subjectId);
      document.getElementById('viewNoteTitle').textContent = n.title;
      document.getElementById('viewNoteSubject').textContent = `${sub.code} - ${sub.name}`;
      document.getElementById('viewNoteContent').textContent = n.content;

      const editBtn = document.getElementById('btnEditViewedNote');
      editBtn.onclick = () => window.semManager.openEditNote(n.id);

      openModal('viewNoteModal');
    },

    deleteNote: function (id) {
      if (confirm('Delete this note?')) {
        AppState.notes = AppState.notes.filter(n => n.id !== id);
        saveState();
        showToast('Note deleted', 'info');
      }
    }
  };

  // --------------------------------------------------------------------------
  // 18. FORM SUBMISSION EVENT LISTENERS
  // --------------------------------------------------------------------------
  function setupFormHandlers() {
    // 1. Subject Form
    document.getElementById('subjectForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('subjectFormId').value;
      const name = document.getElementById('subjectNameInput').value.trim();
      const code = document.getElementById('subjectCodeInput').value.trim().toUpperCase();
      const credits = parseInt(document.getElementById('subjectCreditsInput').value) || 4;
      const teacher = document.getElementById('subjectTeacherInput').value.trim();
      const attended = parseInt(document.getElementById('subjectAttendedInput').value) || 0;
      const total = parseInt(document.getElementById('subjectTotalInput').value) || 0;

      if (id) {
        // Edit existing
        const sub = AppState.subjects.find(s => s.id === id);
        if (sub) {
          sub.name = name;
          sub.code = code;
          sub.credits = credits;
          sub.teacher = teacher;
          sub.attended = attended;
          sub.total = total;
          showToast(`Subject ${code} updated!`, 'success');
        }
      } else {
        // Add new
        const newSub = {
          id: 'sub-' + Date.now(),
          name,
          code,
          credits,
          teacher,
          attended,
          total
        };
        AppState.subjects.push(newSub);
        showToast(`Subject ${code} added!`, 'success');
      }

      saveState();
      closeModal('subjectModal');
    });

    // 2. Assignment Form
    document.getElementById('assignmentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('assignmentFormId').value;
      const title = document.getElementById('assignmentTitleInput').value.trim();
      const subjectId = document.getElementById('assignmentSubjectSelect').value;
      const dueDate = document.getElementById('assignmentDueDateInput').value;
      const status = document.getElementById('assignmentStatusSelect').value;
      const priority = document.getElementById('assignmentPrioritySelect').value;
      const notes = document.getElementById('assignmentDescInput').value.trim();

      if (id) {
        const asg = AppState.assignments.find(a => a.id === id);
        if (asg) {
          asg.title = title;
          asg.subjectId = subjectId;
          asg.dueDate = dueDate;
          asg.status = status;
          asg.priority = priority;
          asg.notes = notes;
          showToast('Assignment updated!', 'success');
        }
      } else {
        const newAsg = {
          id: 'asg-' + Date.now(),
          title,
          subjectId,
          dueDate,
          status,
          priority,
          notes
        };
        AppState.assignments.push(newAsg);
        showToast('Assignment scheduled!', 'success');
      }

      saveState();
      closeModal('assignmentModal');
    });

    // 3. Study Task Form
    document.getElementById('studyTaskForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('studyTaskFormId').value;
      const title = document.getElementById('studyTaskTitleInput').value.trim();
      const subjectId = document.getElementById('studyTaskSubjectSelect').value;
      const date = document.getElementById('studyTaskDateInput').value;
      const time = document.getElementById('studyTaskTimeInput').value;
      const duration = parseInt(document.getElementById('studyTaskDurationInput').value) || 45;

      if (id) {
        const t = AppState.studyTasks.find(task => task.id === id);
        if (t) {
          t.title = title;
          t.subjectId = subjectId;
          t.date = date;
          t.time = time;
          t.duration = duration;
          showToast('Study task updated!', 'success');
        }
      } else {
        const newTask = {
          id: 'st-' + Date.now(),
          title,
          subjectId,
          date,
          time,
          duration,
          completed: false
        };
        AppState.studyTasks.push(newTask);
        showToast('Study task added to planner!', 'success');
      }

      saveState();
      closeModal('studyTaskModal');
    });

    // 4. Exam Form
    document.getElementById('examForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('examFormId').value;
      const title = document.getElementById('examNameInput').value.trim();
      const subjectId = document.getElementById('examSubjectSelect').value;
      const date = document.getElementById('examDateInput').value;
      const time = document.getElementById('examTimeInput').value;
      const room = document.getElementById('examRoomInput').value.trim();
      const syllabus = document.getElementById('examSyllabusInput').value.trim();

      if (id) {
        const ex = AppState.exams.find(e => e.id === id);
        if (ex) {
          ex.title = title;
          ex.subjectId = subjectId;
          ex.date = date;
          ex.time = time;
          ex.room = room;
          ex.syllabus = syllabus;
          showToast('Exam updated!', 'success');
        }
      } else {
        const newExam = {
          id: 'ex-' + Date.now(),
          title,
          subjectId,
          date,
          time,
          room,
          syllabus
        };
        AppState.exams.push(newExam);
        showToast('Exam assessment scheduled!', 'success');
      }

      saveState();
      closeModal('examModal');
    });

    // 5. Marks Form
    document.getElementById('marksForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('marksFormId').value;
      const subjectId = document.getElementById('marksSubjectSelect').value;
      const credits = parseInt(document.getElementById('marksCreditsInput').value) || 4;
      const maxMarks = parseFloat(document.getElementById('marksMaxInput').value) || 100;
      const obtainedMarks = parseFloat(document.getElementById('marksObtainedInput').value) || 0;

      if (id) {
        const mk = AppState.marks.find(m => m.id === id);
        if (mk) {
          mk.subjectId = subjectId;
          mk.credits = credits;
          mk.maxMarks = maxMarks;
          mk.obtainedMarks = obtainedMarks;
          showToast('Marks record updated!', 'success');
        }
      } else {
        const newMarks = {
          id: 'mk-' + Date.now(),
          subjectId,
          credits,
          maxMarks,
          obtainedMarks
        };
        AppState.marks.push(newMarks);
        showToast('Marks entry recorded!', 'success');
      }

      saveState();
      closeModal('marksModal');
    });

    // 6. Note Form
    document.getElementById('noteForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('noteFormId').value;
      const title = document.getElementById('noteTitleInput').value.trim();
      const subjectId = document.getElementById('noteSubjectSelect').value;
      const content = document.getElementById('noteContentInput').value.trim();

      if (id) {
        const n = AppState.notes.find(note => note.id === id);
        if (n) {
          n.title = title;
          n.subjectId = subjectId;
          n.content = content;
          n.date = getTodayDateString();
          showToast('Study note updated!', 'success');
        }
      } else {
        const newNote = {
          id: 'nt-' + Date.now(),
          title,
          subjectId,
          content,
          date: getTodayDateString()
        };
        AppState.notes.push(newNote);
        showToast('Study note created!', 'success');
      }

      saveState();
      closeModal('noteModal');
    });

    // 7. Attendance Adjustment Modal Form
    document.getElementById('attendanceForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const subjectId = document.getElementById('attSubjectSelect').value;
      const attended = parseInt(document.getElementById('attClassesAttended').value) || 0;
      const total = parseInt(document.getElementById('attTotalClassesInput').value) || 0;

      if (attended > total) {
        showToast('Attended classes cannot be greater than total classes!', 'danger');
        return;
      }

      const sub = AppState.subjects.find(s => s.id === subjectId);
      if (sub) {
        sub.attended = attended;
        sub.total = total;
        saveState();
        showToast(`Attendance updated for ${sub.code}`, 'success');
        closeModal('attendanceModal');
      }
    });

    // 8. Student Profile Form
    document.getElementById('profileForm').addEventListener('submit', function (e) {
      e.preventDefault();
      AppState.profile.name = document.getElementById('profName').value.trim();
      AppState.profile.email = document.getElementById('profEmail').value.trim();
      AppState.profile.rollNo = document.getElementById('profRoll').value.trim();
      AppState.profile.semester = document.getElementById('profSemester').value;
      AppState.profile.course = document.getElementById('profCourse').value.trim();
      AppState.profile.branch = document.getElementById('profBranch').value.trim();
      AppState.profile.university = document.getElementById('profUniversity').value.trim();

      saveState();
      showToast('Student Profile details updated successfully!', 'success');
    });

    document.getElementById('btnResetProfileForm').addEventListener('click', () => {
      renderProfileView();
      showToast('Profile form reset to last saved state', 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 19. NAVIGATION & ROUTING
  // --------------------------------------------------------------------------
  function switchPage(pageId) {
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(pageId);
    if (targetView) {
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active class on nav links
    document.querySelectorAll('.sidebar-nav a.nav-link').forEach(link => {
      if (link.getAttribute('data-target') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Topbar page title
    const titleMap = {
      'dashboard': 'Dashboard',
      'subjects': 'Subjects Curriculum',
      'attendance': 'Attendance Tracker',
      'assignments': 'Assignments & Tasks',
      'study-planner': 'Study Planner',
      'exams': 'Exams & Tests',
      'marks': 'Marks & CGPA Calculator',
      'notes': 'Study Notes & References',
      'profile': 'Student Profile'
    };
    document.getElementById('activePageTitle').textContent = titleMap[pageId] || 'Dashboard';

    // Close mobile sidebar if open
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('active');
  }

  function setupNavigation() {
    // Nav links
    document.querySelectorAll('[data-target]').forEach(elem => {
      elem.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        switchPage(target);
        window.location.hash = target;
      });
    });

    // Hash change detection
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        switchPage(hash);
      }
    });

    // Initial route check
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
      switchPage(initialHash);
    }

    // Topbar Profile shortcut
    document.getElementById('topbarProfileTrigger').addEventListener('click', () => {
      switchPage('profile');
      window.location.hash = 'profile';
    });

    // Topbar Quick Add Action
    document.getElementById('topbarQuickAddBtn').addEventListener('click', () => {
      // Pick quick action based on active page or default to Add Assignment
      const activePage = document.querySelector('.page-view.active').id;
      if (activePage === 'subjects') window.semManager.openAddSubject();
      else if (activePage === 'attendance') openModal('attendanceModal');
      else if (activePage === 'study-planner') window.semManager.openAddStudyTask();
      else if (activePage === 'exams') window.semManager.openAddExam();
      else if (activePage === 'marks') window.semManager.openAddMarks();
      else if (activePage === 'notes') window.semManager.openAddNote();
      else window.semManager.openAddAssignment();
    });

    // Open Modal button handlers
    document.getElementById('openAddSubjectModalBtn').addEventListener('click', () => window.semManager.openAddSubject());
    document.getElementById('openAddAttendanceModalBtn').addEventListener('click', () => openModal('attendanceModal'));
    document.getElementById('openAddAssignmentModalBtn').addEventListener('click', () => window.semManager.openAddAssignment());
    document.getElementById('openAddStudyTaskModalBtn').addEventListener('click', () => window.semManager.openAddStudyTask());
    document.getElementById('openAddExamModalBtn').addEventListener('click', () => window.semManager.openAddExam());
    document.getElementById('openAddMarksModalBtn').addEventListener('click', () => window.semManager.openAddMarks());
    document.getElementById('openAddNoteModalBtn').addEventListener('click', () => window.semManager.openAddNote());

    // Sidebar footer actions
    document.getElementById('resetDemoBtn').addEventListener('click', resetToDemo);
    document.getElementById('exportDataBtn').addEventListener('click', exportBackup);

    // Mobile Hamburger
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add('show');
      overlay.classList.add('active');
    });

    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('active');
    });
  }

  // --------------------------------------------------------------------------
  // 20. SEARCH, FILTER & TAB LISTENERS
  // --------------------------------------------------------------------------
  function setupFilters() {
    // Subject Filters
    document.getElementById('subjectSearchInput').addEventListener('input', renderSubjectsView);
    document.getElementById('subjectCreditFilter').addEventListener('change', renderSubjectsView);

    // Assignment Tabs
    document.querySelectorAll('#assignmentStatusTabs .tab-pill').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#assignmentStatusTabs .tab-pill').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentAssignmentTab = this.getAttribute('data-filter');
        renderAssignmentsView();
      });
    });

    document.getElementById('assignmentSearchInput').addEventListener('input', renderAssignmentsView);
    document.getElementById('assignmentSubjectFilter').addEventListener('change', renderAssignmentsView);

    // Study Planner Date Filters
    const dateInput = document.getElementById('studyPlannerDateFilter');
    dateInput.value = currentStudyDate;
    dateInput.addEventListener('change', function () {
      currentStudyDate = this.value;
      renderStudyPlannerView();
    });

    document.getElementById('btnStudySetToday').addEventListener('click', () => {
      currentStudyDate = getTodayDateString();
      dateInput.value = currentStudyDate;
      renderStudyPlannerView();
    });

    document.getElementById('btnStudySetTomorrow').addEventListener('click', () => {
      currentStudyDate = getRelativeDate(1);
      dateInput.value = currentStudyDate;
      renderStudyPlannerView();
    });

    // Exam Filters
    document.getElementById('examSearchInput').addEventListener('input', renderExamsView);
    document.getElementById('examFilterType').addEventListener('change', renderExamsView);

    // Note Filters
    document.getElementById('noteSearchInput').addEventListener('input', renderNotesView);
    document.getElementById('noteSubjectFilter').addEventListener('change', renderNotesView);
  }

  // --------------------------------------------------------------------------
  // 21. UTILITY: ESCAPE HTML STRINGS
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 22. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    // Set system date header
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const dateElem = document.getElementById('systemDateDisplay');
    if (dateElem) dateElem.textContent = dateStr;

    // Load State from LocalStorage
    loadState();

    // Setup Event Listeners
    setupModalDismissals();
    setupFormHandlers();
    setupNavigation();
    setupFilters();

    // Initial UI Render
    refreshAllViews();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
