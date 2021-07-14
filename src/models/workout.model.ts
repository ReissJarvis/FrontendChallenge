export interface Workout {
    id: string
    name: string
    transcript: string
    male: WorkoutImage
    female: WorkoutImage
    bodyAreas: string[]
}

export interface WorkoutImage {
    image: string
}
