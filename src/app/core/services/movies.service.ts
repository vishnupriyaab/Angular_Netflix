import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options = {
  params:{
    include_adult:'false',
    include_video:'true',
    language: 'en-US',
    page:'1',
    sort_by:'popularity.desc'
  },
  headers:{
    accept:'application/json',
    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGYwZWYwNmM2NjU2MjJkMzAyMzM5ZTM0NjAwMDk2NCIsIm5iZiI6MTcyNDA0Njc0My40NDQ3MTEsInN1YiI6IjY2YzI0N2NkYjE1ZTA5OWJhZjVkNmQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PZWCCI_CNSJAslWdrdokyKydrfRqaqEbkgirRNxx6KM'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  http = inject(HttpClient)

  getMovies(){
    return this.http.get('https://api.themoviedb.org/3/discover/movie',options)
  }
  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }
  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated',options);
  }
  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/tv/popular',options);
  }
  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming',options);
  }
  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing',options);
  }
  getRatedMovies() {
    return this.http.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies',options);
  }
  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv',options);
  }
}
