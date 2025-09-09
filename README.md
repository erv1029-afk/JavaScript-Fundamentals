 🎓 Learner Grading Report — Realistic and Expressive

 ✨ Purpose

This project generates learner report cards based on assignment submissions. It’s designed to reflect real-world grading: late penalties, early bonuses, extra credit, and a weighted average that respects the value of each assignment. 

🧠 What It Does

- Filters out assignments that aren’t due yet  
- Applies a **−10 penalty** for late submissions (if score > 10)  
- Adds a **+2 bonus** for on-time submissions  
- Allows scores to exceed the max by **up to 3 points** (extra credit!)  
- Calculates a **weighted average** based on total points possible  
- Skips zero-percent scores to keep the report clean  
- Outputs a learner-by-learner breakdown with assignment percentages and overall average

📊 Sample Output

{
  learner_id: 101,
  assignment_id: "a1",
  submission: {
    score: 85,
    submitted_at: "2025-08-31T20:00:00Z"
  }
}

🛠️ How It Works

The core function is `getLearnerData(course, assignmentGroup, submissions)`. It loops through valid assignments, groups submissions by learner, adjusts scores based on timing, and calculates a weighted average. The final output is a clean array of learner report cards.

🎨 Design Philosophy

This grading logic was designed with clarity and practicality in mind. It reflects a realistic approach to evaluating learner submissions, incorporating timing, effort, and score adjustments where appropriate. The structure is readable and modular, making it easy to revisit or refine as needed. Every decision — from how scores are calculated to how averages are rounded — was made to align with the assignment’s goals and the data available at the time.
