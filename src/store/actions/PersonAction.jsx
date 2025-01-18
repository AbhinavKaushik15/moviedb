export { removePerson } from "../reducers/PersonReducer";
import axios from "../../utils/axios";
import { loadPerson } from "../reducers/PersonReducer";
export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`person/${id}/tv_credits`);

    let theUltimateDetail = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    dispatch(loadPerson(theUltimateDetail));
  } catch (error) {
    console.log("Error: ", error);
  }
};
