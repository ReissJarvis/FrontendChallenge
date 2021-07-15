import { WorkoutApiResponse } from '../models/workout-api-response.model';
import axios from 'axios';

export class WorkoutApiService {

    get(): Promise<WorkoutApiResponse> {
        return axios.get<WorkoutApiResponse>('https://private-922d75-recruitmenttechnicaltest.apiary-mock.com/customexercises/')
            .then(result => result.data)
    }
}