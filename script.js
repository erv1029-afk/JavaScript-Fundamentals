// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

//function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  //const result = [
   // {
  //    id: 125,
   //   avg: 0.985, // (47 + 150) / (50 + 150)
   //   1: 0.94, // 47 / 50
   //   2: 1.0 // 150 / 150
   // },
  //  {
  //    id: 132,
   //   avg: 0.82, // (39 + 125) / (50 + 150)
  //    1: 0.78, // 39 / 50
  //    2: 0.833 // late: (140 - 15) / 150
  //  }
//  ];

  //return result;
//}

//const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

function getLearnerData(course, ag, submissions) {
  const result = [];
  const now = new Date();

  // Helper to check if assignment is due
  function isDue(dueDateStr) {
    const dueDate = new Date(dueDateStr);
    return dueDate.getTime() <= now.getTime() + 1000; 
  }

  // Build valid assignments map
  const validAssignments = {};
  for (let i = 0; i < ag.assignments.length; i++) {
    const assignment = ag.assignments[i];
    if (isDue(assignment.due_at)) {
      validAssignments[assignment.id] = assignment;
    }
  }

  // Group submissions by learner
  const learners = {};

  submissions.forEach(sub => {
    const { learner_id, assignment_id, submission } = sub;
    const assignment = validAssignments[assignment_id];
    if (!assignment) return;

    if (!learners[learner_id]) {
      learners[learner_id] = {
        id: learner_id,
        scores: {},
        totalScore: 0,
        totalPossible: 0
      };
    }

    let score = submission.score;
    const submittedAt = new Date(submission.submitted_at);
    const dueAt = new Date(assignment.due_at);
    let isLate = submittedAt > dueAt;

    // Use switch to apply penalty logic
    switch (isLate) {
      case true:
        score -= 15; // penalty
        break;
      case false:
        score += 2; 
        break;
    }

    // Clamp score to avoid negatives
    if (score < 0) score = 0;

    //Allow score to exceed max by 5
    score = Math.min(score, assignment.points_possible + 5);

    // Calculate percentage
    const percent = +(score / assignment.points_possible).toFixed(2);

    // Store score
    learners[learner_id].scores[assignment_id] = percent;
    learners[learner_id].totalScore += score;
    learners[learner_id].totalPossible += assignment.points_possible;
  });

  // Format output
  for (const id in learners) {
    const learner = learners[id];
    const output = { id: learner.id };

    // Use loop control word
    for (const aid in learner.scores) {
      if (learner.scores[aid] === 0) continue; // skip zero scores
      output[aid] = learner.scores[aid];
    }

    //Round average before dividing
    const roundedTotal = Math.round(learner.totalScore);
    const roundedPossible = Math.round(learner.totalPossible);
    output.avg = +(roundedTotal / roundedPossible).toFixed(3);

    result.push(output);
  }

  // Demonstrate removal of a property
  result.forEach(obj => {
    if (obj.avg > 1) {
      delete obj.avg; 
    }
  });

  return result;
}

// Cached values
const courseName = CourseInfo.name;
const isJavaScriptCourse = courseName.includes("JavaScript");
const hasWeight = AssignmentGroup.group_weight > 0;

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// Final output
console.log(`Course: ${courseName} | Weighted: ${hasWeight} | JS Course: ${isJavaScriptCourse}`);
console.table(result);

//If possible points are 0, you cannot divide by 0. What if the value that you are expecting to be a number is instead a string?

function getLearnerData(course, ag, submissions) {
  const result = [];
  const now = new Date();

  // Validate course match
  if (ag.course_id !== course.id) {
    throw new Error(`Assignment group "${ag.name}" does not belong to course "${course.name}"`);
  }

  const validAssignments = {};
  ag.assignments.forEach(assignment => {
    const dueDate = new Date(assignment.due_at);
    if (dueDate <= now || dueDate.toDateString() === now.toDateString()) {
      validAssignments[assignment.id] = assignment;
    }
  });

  const learners = {};

  submissions.forEach(({ learner_id, assignment_id, submission }) => {
    const assignment = validAssignments[assignment_id];
    if (!assignment) return;

    let pointsPossible = assignment.points_possible;
    let score = submission.score;

    //Convert to string and back
    pointsPossible = Number(String(pointsPossible));
    score = Number(String(score));

    if (pointsPossible === 0 || isNaN(score)) return;

    if (!learners[learner_id]) {
      learners[learner_id] = {
        id: learner_id,
        scores: {},
        totalScore: 0,
        totalPossible: 0
      };
    }

    const submittedAt = new Date(submission.submitted_at);
    const dueAt = new Date(assignment.due_at);
    let isLate = false;

    //Redundant check
    if (submittedAt > dueAt || submittedAt.getTime() > dueAt.getTime()) {
      isLate = true;
    }

    // Apply penalty
    if (isLate && score > 10) {
      score -= 10;
    }

    // Allow score to exceed the max
    score = Math.min(score, pointsPossible + 3);

    const percent = +(score / pointsPossible).toFixed(2);

    //Skip zero scores
    if (percent === 0) return;

    learners[learner_id].scores[assignment_id] = percent;
    learners[learner_id].totalScore += score;
    learners[learner_id].totalPossible += pointsPossible;
  });

  for (const id in learners) {
    const learner = learners[id];
    const output = { id: learner.id };

    for (const aid in learner.scores) {
      output[aid] = learner.scores[aid];
    }

    // Round total before dividing
    const roundedTotal = Math.round(learner.totalScore);
    const roundedPossible = Math.round(learner.totalPossible);
    output.avg = +(roundedTotal / roundedPossible).toFixed(3);

    result.push(output);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.table(result);