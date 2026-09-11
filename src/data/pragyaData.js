// STRAVELLE TEAM: update these two numbers once finalized.
export const SUCCESS_THRESHOLD = {
  preAssessment: 0.70,   // placeholder - Stravelle team will finalize this number
  postAssessment: 0.70,  // placeholder - Stravelle team will finalize this number
};

// Activity Color Palette (Unified across all dashboard bar graphs)
export const ACTIVITY_COLORS = {
  1: {
    bg: '#3A3350',          // Deep Plum (Signature Stravelle theme anchor)
    border: '#2A2438',
    hoverBg: '#2A2438',
    name: 'Mitthu Miyaan',
    label: 'Activity 1: Mitthu Miyaan'
  },
  2: {
    bg: '#7E6FA9',          // Rich Lavender (Theme accent color with contrast)
    border: '#62548C',
    hoverBg: '#695A94',
    name: 'Konsa Kiska Ghar',
    label: 'Activity 2: Konsa Kiska Ghar'
  },
  3: {
    bg: '#E5A823',          // Warm Amber Gold (Theme butter accent made bold & readable)
    border: '#C68A1B',
    hoverBg: '#C68A1B',
    name: 'Aage Kya Aayega',
    label: 'Activity 3: Aage Kya Aayega'
  },
  4: {
    bg: '#5B4E77',          // Slate Plum (Theme accent variant)
    border: '#463A5E',
    hoverBg: '#463A5E',
    name: 'Jo Bola Wohi',
    label: 'Activity 4: Jo Bola Wohi'
  },
  5: {
    bg: '#059669',          // Emerald Teal (Distinct accent for Activity 5)
    border: '#047857',
    hoverBg: '#047857',
    name: 'Bloop Kaun',
    label: 'Activity 5: Bloop Kaun'
  }
};

export function getActivityColor(activityId, type = 'bg') {
  const act = ACTIVITY_COLORS[activityId] || ACTIVITY_COLORS[1];
  return act[type] || act.bg;
}

export const PRAGYA_DATA = {
  meta: {
    schoolYear: "2026-27",
    school: "Pilot Government School (Stravelle Pragya AI Program)",
    classes: [1, 2, 3, 4, 5],
    activities: [
      { id: 1, name: "Mitthu Miyaan", homeClass: 1, subtitle: "Memorization ≠ Understanding", desc: "A parrot character who remembers things but doesn't understand them, used to introduce the idea that memorization ≠ understanding." },
      { id: 2, name: "Konsa Kiska Ghar", homeClass: 2, subtitle: "Pattern Matching & Classification", desc: "A 4-hole colour-sorting box game where students match coloured balls to holes, used to introduce pattern-matching/classification." },
      { id: 3, name: "Aage Kya Aayega", homeClass: 3, subtitle: "Rules & Patterns", desc: "Includes a 'robot' role-play where one student writes rules and another (the 'robot') follows only those exact rules, introducing what a machine/rule/pattern is." },
      { id: 4, name: "Jo Bola Wohi", homeClass: 4, subtitle: "Algorithmic Execution & Debugging", desc: "A precise instruction-following role-play where students write explicit step-by-step algorithms and identify execution bugs." },
      { id: 5, name: "Bloop Kaun", homeClass: 5, subtitle: "Feature Extraction & Model Training", desc: "An interactive classification activity where students extract distinguishing features to identify unknown entities and understand model rules." }
    ]
  },

  totalStudentStrengthByClass: {
    "1": 78, "2": 65, "3": 68, "4": 63, "5": 65
  },

  attendanceCountByClassByActivity: {
    "1": { "1": 51, "2": 47, "3": 58, "5": 62 },
    "2": { "1": 53, "2": 53, "3": 47, "5": 50 },
    "3": { "1": 49, "2": 55, "3": 44, "4": 59, "5": 58 },
    "4": { "2": 50, "3": 51, "4": 54, "5": 50 },
    "5": { "3": 47, "4": 45 }
  },
  attendanceCountTotal: 983,

  attendancePercentByClassByActivity: {
    "1": { "1": 0.6538461538461539, "2": 0.7230769230769231, "3": 0.8529411764705882, "5": 0.9117647058823529 },
    "2": { "1": 0.6794871794871795, "2": 0.8153846153846154, "3": 0.6911764705882353, "5": 0.7352941176470589 },
    "3": { "1": 0.6282051282051282, "2": 0.8461538461538461, "3": 0.6470588235294118, "4": 0.8676470588235294, "5": 0.8529411764705882 },
    "4": { "2": 0.7692307692307693, "3": 0.75, "4": 0.7941176470588235, "5": 0.7352941176470589 },
    "5": { "3": 0.6911764705882353, "4": 0.6617647058823529 }
  },
  attendancePercentOverall: 0.7529768992617292,

  sessionsCountByClassByActivity: {
    "1": { "1": 2, "2": "1*", "3": "1*", "5": 1 },
    "2": { "1": 2, "2": "1*", "3": "1*", "5": 1 },
    "3": { "1": 1, "2": 1, "3": 1, "4": 1, "5": 1 },
    "4": { "2": 1, "3": 1, "4": 1, "5": 1 },
    "5": { "3": 1, "4": 1 }
  },
  sessionsCountTotal: 17,

  studentsInWorkshopAcrossAllSessionsByClassByActivity: {
    "1": { "1": 98, "2": 47, "3": 58, "5": 62 },
    "2": { "1": 106, "2": 53, "3": 47, "5": 50 },
    "3": { "1": 49, "2": 55, "3": 44, "4": 59, "5": 58 },
    "4": { "2": 50, "3": 51, "4": 54, "5": 50 },
    "5": { "3": 47, "4": 45 }
  },
  studentsInWorkshopTotal: 1083,

  studentsByActivityBySession: {
    activity1_sessions: ["1.1", "1.2"],
    activity2_sessions: ["2.1", "2.2"],
    activity3_sessions: ["3.1", "3.2"],
    activity4_sessions: ["4.1"],
    activity5_sessions: ["5.1", "5.2"],
    byClass: {
      "1": { "1.1": 51, "1.2": 47, "2.1": 47, "3.1": 58, "5.1": 62 },
      "2": { "1.1": 53, "1.2": 53, "2.1": 53, "3.1": 47, "5.1": 50 },
      "3": { "1.1": 49, "2.1": 55, "3.1": 44, "4.1": 59, "5.1": 58 },
      "4": { "2.1": 50, "3.1": 51, "4.1": 54, "5.1": 50 },
      "5": { "3.1": 47, "4.1": 45 }
    },
    total: 1083
  },

  engagedStudentsByClassByActivity: {
    "1": { "1": 94, "2": 45, "3": 50, "5": 58 },
    "2": { "1": 101, "2": 51, "3": 45, "5": 48 },
    "3": { "1": 47, "2": 54, "3": 43, "4": 54, "5": 54 },
    "4": { "2": 49, "3": 49, "4": 52, "5": 47 },
    "5": { "3": 46, "4": 41 }
  },
  engagedStudentsTotal: 1028,

  engagedStudentsBySession: {
    "1": { "1.1": 48, "1.2": 46, "2.1": 45, "3.1": 50, "5.1": 58 },
    "2": { "1.1": 50, "1.2": 51, "2.1": 51, "3.1": 45, "5.1": 48 },
    "3": { "1.1": 47, "2.1": 54, "3.1": 43, "4.1": 54, "5.1": 54 },
    "4": { "2.1": 49, "3.1": 49, "4.1": 52, "5.1": 47 },
    "5": { "3.1": 46, "4.1": 41 }
  },

  engagementRateByClassByActivity: {
    "1": { "1": 0.9599499374217773, "2": 0.9574468085106383, "3": 0.8620689655172413, "5": 0.9354838709677419 },
    "2": { "1": 0.9528301886792453, "2": 0.9622641509433962, "3": 0.9574468085106383, "5": 0.96 },
    "3": { "1": 0.9591836734693877, "2": 0.9818181818181818, "3": 0.9772727272727273, "4": 0.9152542372881356, "5": 0.9310344827586207 },
    "4": { "2": 0.98, "3": 0.9607843137254902, "4": 0.9629629629629629, "5": 0.94 },
    "5": { "3": 0.9787234042553191, "4": 0.9111111111111111 }
  },
  engagementRateAverage: 0.9497703065901377,

  engagementRateBySession: {
    "1": { "1.1": 0.9411764705882353, "1.2": 0.9787234042553191, "2.1": 0.9574468085106383, "3.1": 0.8620689655172413, "5.1": 0.9354838709677419 },
    "2": { "1.1": 0.9433962264150944, "1.2": 0.9622641509433962, "2.1": 0.9622641509433962, "3.1": 0.9574468085106383, "5.1": 0.96 },
    "3": { "1.1": 0.9591836734693877, "2.1": 0.9818181818181818, "3.1": 0.9772727272727273, "4.1": 0.9152542372881356, "5.1": 0.9310344827586207 },
    "4": { "2.1": 0.98, "3.1": 0.9607843137254902, "4.1": 0.9629629629629629, "5.1": 0.94 },
    "5": { "3.1": 0.9787234042553191, "4.1": 0.9111111111111111 },
    average: 0.9504007595863636
  },

  goodComprehensionCountByClassByActivity: {
    "1": { "1": 80, "2": 42, "3": 46, "5": 50 },
    "2": { "1": 94, "2": 50, "3": 41, "5": 44 },
    "3": { "1": 47, "2": 54, "3": 40, "4": 53, "5": 52 },
    "4": { "2": 49, "3": 47, "4": 51, "5": 43 },
    "5": { "3": 44, "4": 39 }
  },
  goodComprehensionCountTotal: 966,

  goodComprehensionBySession: {
    "1": { "1.1": 40, "1.2": 40, "2.1": 42, "3.1": 46, "5.1": 50 },
    "2": { "1.1": 45, "1.2": 49, "2.1": 50, "3.1": 41, "5.1": 44 },
    "3": { "1.1": 47, "2.1": 54, "3.1": 40, "4.1": 53, "5.1": 52 },
    "4": { "2.1": 49, "3.1": 47, "4.1": 51, "5.1": 43 },
    "5": { "3.1": 44, "4.1": 39 }
  },

  comprehensionRateByClassByActivity: {
    "1": { "1": 0.8176887776387151, "2": 0.8936170212765957, "3": 0.7931034482758621, "5": 0.8064516129032258 },
    "2": { "1": 0.8867924528301887, "2": 0.9433962264150944, "3": 0.8723404255319149, "5": 0.88 },
    "3": { "1": 0.9591836734693877, "2": 0.9818181818181818, "3": 0.9090909090909091, "4": 0.8983050847457628, "5": 0.896551724137931 },
    "4": { "2": 0.98, "3": 0.9215686274509803, "4": 0.9444444444444444, "5": 0.86 },
    "5": { "3": 0.9361702127659575, "4": 0.8666666666666667 }
  },
  comprehensionRateAverage: 0.8972204994453589,

  comprehensionRateBySession: {
    "1": { "1.1": 0.7843137254901961, "1.2": 0.851063829787234, "2.1": 0.8936170212765957, "3.1": 0.7931034482758621, "5.1": 0.8064516129032258 },
    "2": { "1.1": 0.8490566037735849, "1.2": 0.9245283018867925, "2.1": 0.9433962264150944, "3.1": 0.8723404255319149, "5.1": 0.88 },
    "3": { "1.1": 0.9591836734693877, "2.1": 0.9818181818181818, "3.1": 0.9090909090909091, "4.1": 0.8983050847457628, "5.1": 0.896551724137931 },
    "4": { "2.1": 0.98, "3.1": 0.9215686274509803, "4.1": 0.9444444444444444, "5.1": 0.86 },
    "5": { "3.1": 0.9361702127659575, "4.1": 0.8666666666666667 },
    average: 0.892936700949082
  },

  vocabularyIntroducedByClassByActivity: {
    "1": { "1": "NA", "2": "NA", "3": "-", "4": "NA", "5": "-" },
    "2": { "3": ["Rule"], "5": "-" },
    "3": { "3": ["Rule", "Machine"], "4": ["Robot"], "5": ["Feature"] },
    "4": { "1": "-", "2": ["Classify"], "3": ["Rule", "Machine", "Robot"], "4": ["Debug"], "5": ["Feature"] },
    "5": { "1": "-", "2": "-", "3": ["Rule", "Machine", "Robot"], "4": ["Debug", "Goal/Aim/Target"], "5": "-" }
  },

  vocabularyRetention: "NOT_YET_COLLECTED",
  retentionAssessment: "NOT_YET_COLLECTED"
};

// Helper: Compute dynamic Overview Tab statistics
export function getOverviewStats() {
  const totalEnrolled = Object.values(PRAGYA_DATA.totalStudentStrengthByClass).reduce((a, b) => a + b, 0);
  const totalSessions = PRAGYA_DATA.sessionsCountTotal;
  const totalWorkshopHeadcount = PRAGYA_DATA.studentsInWorkshopTotal;
  const overallAttendancePercent = PRAGYA_DATA.attendancePercentOverall;
  const overallEngagementRate = PRAGYA_DATA.engagementRateAverage;
  const overallComprehensionRate = PRAGYA_DATA.comprehensionRateAverage;
  const uniqueAttendanceTotal = PRAGYA_DATA.attendanceCountTotal;

  return {
    totalEnrolled,            // 339
    totalSessions,            // 17
    totalWorkshopHeadcount,   // 1083
    uniqueAttendanceTotal,    // 983
    overallAttendancePercent, // ~0.753
    overallEngagementRate,   // ~0.950
    overallComprehensionRate  // ~0.897
  };
}

// Helper: Get matrix breakdown per class x activity
export function getClassActivityMatrix() {
  const classes = PRAGYA_DATA.meta.classes;
  const activities = PRAGYA_DATA.meta.activities;

  const matrix = [];

  classes.forEach(c => {
    const classStr = String(c);
    const strength = PRAGYA_DATA.totalStudentStrengthByClass[classStr];

    activities.forEach(a => {
      const actIdStr = String(a.id);

      const attCount = PRAGYA_DATA.attendanceCountByClassByActivity[classStr]?.[actIdStr] ?? null;
      const attPercent = PRAGYA_DATA.attendancePercentByClassByActivity[classStr]?.[actIdStr] ?? null;
      const sessionCount = PRAGYA_DATA.sessionsCountByClassByActivity[classStr]?.[actIdStr] ?? null;
      const workshopHeadcount = PRAGYA_DATA.studentsInWorkshopAcrossAllSessionsByClassByActivity[classStr]?.[actIdStr] ?? null;
      const engagedCount = PRAGYA_DATA.engagedStudentsByClassByActivity[classStr]?.[actIdStr] ?? null;
      const engagementRate = PRAGYA_DATA.engagementRateByClassByActivity[classStr]?.[actIdStr] ?? null;
      const goodCompCount = PRAGYA_DATA.goodComprehensionCountByClassByActivity[classStr]?.[actIdStr] ?? null;
      const compRate = PRAGYA_DATA.comprehensionRateByClassByActivity[classStr]?.[actIdStr] ?? null;
      const vocab = PRAGYA_DATA.vocabularyIntroducedByClassByActivity[classStr]?.[actIdStr] ?? null;

      matrix.push({
        class: c,
        className: `Class ${c}`,
        activityId: a.id,
        activityName: a.name,
        strength,
        attendanceCount: attCount,
        attendancePercent: attPercent,
        sessionCount,
        workshopHeadcount,
        engagedCount,
        engagementRate,
        goodComprehensionCount: goodCompCount,
        comprehensionRate: compRate,
        vocabulary: vocab,
        hasHeld: attCount !== null
      });
    });
  });

  return matrix;
}

// Helper: Filter matrix by class and activity
export function getFilteredMatrix(classFilter = "ALL", activityFilter = "ALL") {
  let matrix = getClassActivityMatrix();

  if (classFilter !== "ALL") {
    matrix = matrix.filter(item => String(item.class) === String(classFilter));
  }

  if (activityFilter !== "ALL") {
    matrix = matrix.filter(item => String(item.activityId) === String(activityFilter));
  }

  return matrix;
}

// Formatters
export function formatPercent(val, decimals = 1) {
  if (val === null || val === undefined || val === "NOT_YET_COLLECTED") return "-";
  if (typeof val === "string" && val.includes("*")) return val;
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return "-";
  return (num * 100).toFixed(decimals) + "%";
}

export function formatValue(val) {
  if (val === null || val === undefined || val === "NOT_YET_COLLECTED") return "-";
  return val;
}
