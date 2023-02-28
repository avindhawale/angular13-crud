import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.isLoading.pipe(delay(0)).subscribe((value) => {
      this.loading = value;
    });
  }
}
