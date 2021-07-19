import { WorkoutApiResponse } from '../models';
import axios from 'axios';

export class WorkoutApiService {

    get(): Promise<WorkoutApiResponse> {
        return axios.get<WorkoutApiResponse>('https://private-922d75-recruitmenttechnicaltest.apiary-mock.com/customexercises/')
            .then(result => {
                return result.data
            })
    }
}
