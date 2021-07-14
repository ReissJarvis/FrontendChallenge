import { WorkoutApiResponse } from '../models/workout-api-response.model';
import axios from 'axios';

export class WorkoutApiService {

    get(): Promise<WorkoutApiResponse> {
        return axios.get<WorkoutApiResponse>('REPLACE_ME')
            .then(result => result.data)
    }
}
