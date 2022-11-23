import {useDelete, useFetch, usePost, useUpdate} from './reactQuery';
import {Plan, PlanByDateParams, PlanByDateResponse} from '../models';

/*
 *
 * LIST BY DATE
 *
 */
export const useListPlan = (
  userToken: string,
  {year, month, day}: PlanByDateParams,
) =>
  useFetch<PlanByDateResponse>(
    `/plan/one-day/{year}/{month}/{day}/{userToken}?year=${year}&month=${month}&day=${day}&userToken=${userToken}`,
  );
/*
 *
 * SAVE
 *
 */
export const useSavePlan = () => usePost<Plan[], Plan>(`/plan/save`);
/*
 *
 * UPDATE
 *
 */
export const useUpdatePlan = () => useUpdate<Plan[], Plan>(`/plan/modify`);
/*
 *
 * DELETE
 *
 */

/*
 *
 *
 *
 */
