declare var google: any;

import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../core/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  movieService = inject(MoviesService);
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];
  auth: any;
  ngOnInit(): void {
    const joinData = combineLatest(this.sources)
    joinData.subscribe(([movies, tvShows, nowPlaying, upcoming, popular, topRated]: any[]) => {
      this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[0].id);
      this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[0].id);
      this.movies = movies?.results as IVideoContent[];
      this.tvShows = tvShows?.results as IVideoContent[];
      this.nowPlayingMovies = nowPlaying?.results as IVideoContent[];
      this.upcomingMovies = upcoming?.results as IVideoContent[];
      this.popularMovies = popular?.results as IVideoContent[];
      this.topRatedMovies = topRated?.results as IVideoContent[];
    });
  }
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
}
