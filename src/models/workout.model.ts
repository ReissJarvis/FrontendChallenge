export interface Workout {
    id: string
    name: string
    transcript: string
    male: WorkoutImage
    female: WorkoutImage

}

export interface WorkoutImage {
    image: string
}
