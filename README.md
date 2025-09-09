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

```js
[
  {
    id: 101,
    "a1": 0.85,
    "a2": 0.95,
    avg: 0.90
  },
  {
    id: 102,
    "a1": 0.78,
    avg: 0.78
  }
]
```

🛠️ How It Works

The core function is `getLearnerData(course, assignmentGroup, submissions)`. It loops through valid assignments, groups submissions by learner, adjusts scores based on timing, and calculates a weighted average. The final output is a clean array of learner report cards.

🎨 Design Philosophy

This isn’t a rigid grading engine. It’s expressive, flexible, and built to reflect effort and timing. Slight inconsistencies are okay — they make the system feel more human. The logic is modular and easy to tweak if you want to adjust penalties, bonuses, or rounding behavior.


