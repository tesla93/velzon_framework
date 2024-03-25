import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule, NgbTooltip, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
// Counter
import { CountUpModule } from 'ngx-countup';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ClientLogoComponent } from './landing/index/client-logo/client-logo.component';
import { ServicesComponent } from './landing/index/services/services.component';
import { CollectionComponent } from './landing/index/collection/collection.component';
import { CtaComponent } from './landing/index/cta/cta.component';
import { DesignedComponent } from './landing/index/designed/designed.component';
import { PlanComponent } from './landing/index/plan/plan.component';
import { FaqsComponent } from './landing/index/faqs/faqs.component';
import { ReviewComponent } from './landing/index/review/review.component';
import { CounterComponent } from './landing/index/counter/counter.component';
import { WorkProcessComponent } from './landing/index/work-process/work-process.component';
import { TeamComponent } from './landing/index/team/team.component';
import { ContactComponent } from './landing/index/contact/contact.component';
import { FooterComponent } from './landing/index/footer/footer.component';
import { ScrollspyDirective } from './scrollspy.directive';

// NFT Landing 
import { MarketPlaceComponent } from './landing/nft/market-place/market-place.component';
import { WalletComponent } from './landing/nft/wallet/wallet.component';
import { FeaturesComponent } from './landing/nft/features/features.component';
import { CategoriesComponent } from './landing/nft/categories/categories.component';
import { DiscoverComponent } from './landing/nft/discover/discover.component';
import { TopCreatorComponent } from './landing/nft/top-creator/top-creator.component';

// Job Landing 
import { BlogComponent } from './landing/job/blog/blog.component';
import { CandidateComponent } from './landing/job/candidate/candidate.component';
import { FindjobsComponent } from './landing/job/findjobs/findjobs.component';
import { JobFooterComponent } from './landing/job/job-footer/job-footer.component';
import { JobcategoriesComponent } from './landing/job/jobcategories/jobcategories.component';
import { ProgressComponent } from './landing/job/progress/progress.component';
import { LandingScrollspyDirective } from './landingscrollspy.directive';
import { GeneratePdf } from './pdf-reports/generate-pdf';
import { GridComponent } from './grid/grid.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbdListViewSortableHeaderDirective } from './directives/list-view-sortable.directive';
import { NullWithDefaultPipe } from './pipes/null-with-default.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { FormatFileSizePipe } from './pipes/format-files-size.pipe';
import { HideCardNumberPipe } from './pipes/hide-card-number.pipe';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: `${''}`,
  maxFilesize: 500,
  uploadMultiple: false,
  acceptedFiles: '.csv'
};

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ClientLogoComponent,
    ServicesComponent,
    CollectionComponent,
    CtaComponent,
    DesignedComponent,
    HideCardNumberPipe,
    NullWithDefaultPipe,
    StripHtmlPipe,
    FormatFileSizePipe,
    PlanComponent,
    FaqsComponent,
    ReviewComponent,
    CounterComponent,
    NgbdListViewSortableHeaderDirective,
    WorkProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    GridComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    MarketPlaceComponent,
    WalletComponent,
    FeaturesComponent,
    CategoriesComponent,
    DiscoverComponent,
    TopCreatorComponent,
    BlogComponent,
    CandidateComponent,
    FindjobsComponent,
    JobFooterComponent,
    JobcategoriesComponent,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbTooltip,
    NgbAccordionModule,
    NgbPaginationModule,
    NgbDropdownModule,
    TranslateModule,
    NgSelectModule,
    DropzoneModule,
    FormsModule,
    SlickCarouselModule,
    CountUpModule,
    RouterModule
  ],
  exports: [BreadcrumbsComponent,
    ClientLogoComponent,
    ServicesComponent,
    CollectionComponent,
    GridComponent,
    CtaComponent,
    DesignedComponent,
    PlanComponent,
    FaqsComponent,
    ReviewComponent,
    CounterComponent,
    WorkProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    WalletComponent,
    MarketPlaceComponent,
    FeaturesComponent,
    CategoriesComponent,
    DiscoverComponent,
    TopCreatorComponent,
    ProgressComponent,
    FindjobsComponent,
    CandidateComponent,
    BlogComponent,
    JobcategoriesComponent,
    JobFooterComponent],
    providers: [
      DatePipe,
      NullWithDefaultPipe,
      StripHtmlPipe,
      FormatFileSizePipe,
      HideCardNumberPipe,
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
