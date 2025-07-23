export {};
// actions/task.ts

/**
 * @typedef Task
 * @property {string} id - מזהה ייחודי למשימה.
 * @property {string} name - שם קצר ותיאורי למשימה.
 * @property {string} description - תיאור מפורט של מטרת המשימה.
 * @property {string[]} instructions - רשימה של הנחיות פעולה ספציפיות לביצוע המשימה.
 * @property {string[]} affectedFiles - רשימת נתיבים לקבצים שיושפעו מהמשימה.
 * @property {string[]} [dependencies] - מזהי משימות אחרות שהמשימה הנוכחית תלויה בהן.
 * @property {string} [output] - תיאור התוצר הצפוי לאחר השלמת המשימה.
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  affectedFiles: string[];
  dependencies?: string[];
  output?: string;
}

/**
 * @typedef Agent
 * @property {string} id - מזהה ייחודי לסוכן.
 * @property {string} name - שם הסוכן.
 * @property {string} string - תיאור של תפקיד הסוכן.
 * @property {Task[]} tasks - רשימה של המשימות שהסוכן אחראי עליהן.
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

// דוגמה לסוכן משודרג עם משימה מקיפה בעברית
export const fullStackEnhancerAgent: Agent = {
  id: 'full-stack-enhancer',
  name: 'FullStackEnhancer',
  description: 'סוכן לשדרוג, העשרה, נגישות, תיעוד ו-DevOps לאתר Lions of Zion',
  tasks: [
    {
      id: 'full-stack-enhancement',
      name: 'Full-Stack Enhancement & UI/UX Reimagination',
      description: 'שדרוג מקיף של האתר, כולל גלובוס תלת-מימדי, חווית משתמש, חוב טכני, ביצועים, תיעוד ו-DevOps',
      instructions: [
        'סקור קבצי קונפיגורציה: package.json, tsconfig.txt, tailwind.config.js, postcss.config.js, jest.config.js, lighthouserc.json',
        'מפה את עץ התיקיות והקבצים (tree.txt, filelist.txt)',
        'נתח את כל התלויות והבעיות הידועות',
        'קרא את README.md ו-readme.txt',
        'הערך את רכיבי ה-UI הקיימים',
        'התקן react ו-react-dom במידת הצורך',
        'טפל ב-ts-node וב-tsconfig-paths',
        'עדכן תלויות (pnpm outdated)',
        'הפעל strict ב-TypeScript ותקן שגיאות',
        'נקה קוד מת ותלויות לא בשימוש',
        'שדרג את גלובוס ה-3D (GalacticGlobeApp.tsx)',
        'החלף טקסטורות לנתיבים אמיתיים',
        'יישם אינטראקציות 3D מתקדמות',
        'שפר רקע כוכבים',
        'שלב UI/UX עם 3D',
        'וודא שימוש ב-CSS Variables ו-Tailwind',
        'הוסף מצב כהה/בהיר',
        'בצע refactor לרכיבים',
        'בצע אופטימיזציה לטעינת נכסים ורנדור',
        'הטמע טעינת נתונים אסינכרונית ו-caching',
        'הרחב את SearchBar לסינון חכם',
        'צור משימות Placeholder לאינטגרציית נתונים והתאמה אישית',
        'הטמע ARIA, נגישות וניווט מקלדת',
        'בדוק ניגודיות ו-alt text',
        'השלם README ותיעוד רכיבים',
        'תרגם קבצי JSON לעברית והטמע RTL',
        'הוסף בדיקות אוטומטיות (Jest, E2E, נגישות)',
        'שפר CI/CD ופתרונות ניטור',
        'אין ליצור כפילויות, יש לשדרג קיים בלבד',
        'דווח על חוסרים ובעיות קריטיות',
        'בצע משימות Placeholder לפי הצורך'
      ],
      affectedFiles: [
        'package.json', 'tsconfig.txt', 'tailwind.config.js', 'postcss.config.js', 'jest.config.js', 'lighthouserc.json',
        'tree.txt', 'filelist.txt', 'README.md', 'readme.txt',
        'src/components/ui/*', 'src/components/globe/GlobeVisualization.tsx', 'src/components/globe/GalacticGlobeApp.tsx',
        'src/app/page.tsx', 'styles/global.css', 'public/*', 'public/locales/*',
        'ci.yml', 'tests/*', 'scripts/*'
      ],
      dependencies: [],
      output: 'אתר משודרג, נגיש, מתועד, עם גלובוס תלת-מימדי אינטראקטיבי, תיעוד מלא, בדיקות אוטומטיות ו-DevOps.'
    }
  ]
};