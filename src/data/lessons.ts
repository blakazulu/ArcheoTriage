export interface LessonSection {
  titleKey: string
  contentKey: string
}

export interface Lesson {
  id: string
  artifactType: string
  icon: string
  durationMinutes: number
  sections: LessonSection[]
}

export interface QuizQuestion {
  id: string
  questionKey: string
  options: { key: string; correct: boolean }[]
}

export interface Quiz {
  lessonId: string
  questions: QuizQuestion[]
}

export const lessons: Lesson[] = [
  {
    id: 'ceramics-preservation',
    artifactType: 'ceramics',
    icon: '🏺',
    durationMinutes: 5,
    sections: [
      { titleKey: 'lessons.ceramics.section1.title', contentKey: 'lessons.ceramics.section1.content' },
      { titleKey: 'lessons.ceramics.section2.title', contentKey: 'lessons.ceramics.section2.content' },
      { titleKey: 'lessons.ceramics.section3.title', contentKey: 'lessons.ceramics.section3.content' },
    ],
  },
  {
    id: 'metals-preservation',
    artifactType: 'metals',
    icon: '🪙',
    durationMinutes: 6,
    sections: [
      { titleKey: 'lessons.metals.section1.title', contentKey: 'lessons.metals.section1.content' },
      { titleKey: 'lessons.metals.section2.title', contentKey: 'lessons.metals.section2.content' },
      { titleKey: 'lessons.metals.section3.title', contentKey: 'lessons.metals.section3.content' },
    ],
  },
  {
    id: 'organic-preservation',
    artifactType: 'organic',
    icon: '🦴',
    durationMinutes: 5,
    sections: [
      { titleKey: 'lessons.organic.section1.title', contentKey: 'lessons.organic.section1.content' },
      { titleKey: 'lessons.organic.section2.title', contentKey: 'lessons.organic.section2.content' },
      { titleKey: 'lessons.organic.section3.title', contentKey: 'lessons.organic.section3.content' },
    ],
  },
  {
    id: 'textiles-preservation',
    artifactType: 'textiles',
    icon: '🧵',
    durationMinutes: 5,
    sections: [
      { titleKey: 'lessons.textiles.section1.title', contentKey: 'lessons.textiles.section1.content' },
      { titleKey: 'lessons.textiles.section2.title', contentKey: 'lessons.textiles.section2.content' },
      { titleKey: 'lessons.textiles.section3.title', contentKey: 'lessons.textiles.section3.content' },
    ],
  },
  {
    id: 'scrolls-preservation',
    artifactType: 'scrolls',
    icon: '📜',
    durationMinutes: 7,
    sections: [
      { titleKey: 'lessons.scrolls.section1.title', contentKey: 'lessons.scrolls.section1.content' },
      { titleKey: 'lessons.scrolls.section2.title', contentKey: 'lessons.scrolls.section2.content' },
      { titleKey: 'lessons.scrolls.section3.title', contentKey: 'lessons.scrolls.section3.content' },
    ],
  },
]

export const quizzes: Quiz[] = [
  {
    lessonId: 'ceramics-preservation',
    questions: [
      {
        id: 'c1',
        questionKey: 'quizzes.ceramics.q1.question',
        options: [
          { key: 'quizzes.ceramics.q1.a', correct: false },
          { key: 'quizzes.ceramics.q1.b', correct: true },
          { key: 'quizzes.ceramics.q1.c', correct: false },
        ],
      },
      {
        id: 'c2',
        questionKey: 'quizzes.ceramics.q2.question',
        options: [
          { key: 'quizzes.ceramics.q2.a', correct: false },
          { key: 'quizzes.ceramics.q2.b', correct: false },
          { key: 'quizzes.ceramics.q2.c', correct: true },
        ],
      },
      {
        id: 'c3',
        questionKey: 'quizzes.ceramics.q3.question',
        options: [
          { key: 'quizzes.ceramics.q3.a', correct: true },
          { key: 'quizzes.ceramics.q3.b', correct: false },
          { key: 'quizzes.ceramics.q3.c', correct: false },
        ],
      },
    ],
  },
  {
    lessonId: 'metals-preservation',
    questions: [
      {
        id: 'm1',
        questionKey: 'quizzes.metals.q1.question',
        options: [
          { key: 'quizzes.metals.q1.a', correct: true },
          { key: 'quizzes.metals.q1.b', correct: false },
          { key: 'quizzes.metals.q1.c', correct: false },
        ],
      },
      {
        id: 'm2',
        questionKey: 'quizzes.metals.q2.question',
        options: [
          { key: 'quizzes.metals.q2.a', correct: false },
          { key: 'quizzes.metals.q2.b', correct: true },
          { key: 'quizzes.metals.q2.c', correct: false },
        ],
      },
      {
        id: 'm3',
        questionKey: 'quizzes.metals.q3.question',
        options: [
          { key: 'quizzes.metals.q3.a', correct: false },
          { key: 'quizzes.metals.q3.b', correct: false },
          { key: 'quizzes.metals.q3.c', correct: true },
        ],
      },
    ],
  },
  {
    lessonId: 'organic-preservation',
    questions: [
      {
        id: 'o1',
        questionKey: 'quizzes.organic.q1.question',
        options: [
          { key: 'quizzes.organic.q1.a', correct: false },
          { key: 'quizzes.organic.q1.b', correct: true },
          { key: 'quizzes.organic.q1.c', correct: false },
        ],
      },
      {
        id: 'o2',
        questionKey: 'quizzes.organic.q2.question',
        options: [
          { key: 'quizzes.organic.q2.a', correct: true },
          { key: 'quizzes.organic.q2.b', correct: false },
          { key: 'quizzes.organic.q2.c', correct: false },
        ],
      },
      {
        id: 'o3',
        questionKey: 'quizzes.organic.q3.question',
        options: [
          { key: 'quizzes.organic.q3.a', correct: false },
          { key: 'quizzes.organic.q3.b', correct: false },
          { key: 'quizzes.organic.q3.c', correct: true },
        ],
      },
    ],
  },
  {
    lessonId: 'textiles-preservation',
    questions: [
      {
        id: 't1',
        questionKey: 'quizzes.textiles.q1.question',
        options: [
          { key: 'quizzes.textiles.q1.a', correct: false },
          { key: 'quizzes.textiles.q1.b', correct: false },
          { key: 'quizzes.textiles.q1.c', correct: true },
        ],
      },
      {
        id: 't2',
        questionKey: 'quizzes.textiles.q2.question',
        options: [
          { key: 'quizzes.textiles.q2.a', correct: true },
          { key: 'quizzes.textiles.q2.b', correct: false },
          { key: 'quizzes.textiles.q2.c', correct: false },
        ],
      },
      {
        id: 't3',
        questionKey: 'quizzes.textiles.q3.question',
        options: [
          { key: 'quizzes.textiles.q3.a', correct: false },
          { key: 'quizzes.textiles.q3.b', correct: true },
          { key: 'quizzes.textiles.q3.c', correct: false },
        ],
      },
    ],
  },
  {
    lessonId: 'scrolls-preservation',
    questions: [
      {
        id: 's1',
        questionKey: 'quizzes.scrolls.q1.question',
        options: [
          { key: 'quizzes.scrolls.q1.a', correct: true },
          { key: 'quizzes.scrolls.q1.b', correct: false },
          { key: 'quizzes.scrolls.q1.c', correct: false },
        ],
      },
      {
        id: 's2',
        questionKey: 'quizzes.scrolls.q2.question',
        options: [
          { key: 'quizzes.scrolls.q2.a', correct: false },
          { key: 'quizzes.scrolls.q2.b', correct: false },
          { key: 'quizzes.scrolls.q2.c', correct: true },
        ],
      },
      {
        id: 's3',
        questionKey: 'quizzes.scrolls.q3.question',
        options: [
          { key: 'quizzes.scrolls.q3.a', correct: false },
          { key: 'quizzes.scrolls.q3.b', correct: true },
          { key: 'quizzes.scrolls.q3.c', correct: false },
        ],
      },
    ],
  },
]

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id)
}

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return quizzes.find(q => q.lessonId === lessonId)
}
