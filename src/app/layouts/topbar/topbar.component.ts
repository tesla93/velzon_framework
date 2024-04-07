import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef } from '@angular/core';
import { EventService } from '../../core/services/event.service';

//Logout

// Language
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';

import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DATA_PRELOADER, LAYOUT_MODE, LAYOUT_POSITION, LAYOUT_VERTICAL, LAYOUT_WIDTH, SIDEBAR_COLOR, SIDEBAR_IMAGE, SIDEBAR_SIZE, SIDEBAR_VIEW, SIDEBAR_VISIBILITY, TOPBAR } from '../layout.model';
import { AppConsts } from 'src/app/core/AppConsts';
import { UtilsService } from 'src/app/shared/utils/utils-service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  element: any;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layout: string | undefined;
  mode: string | undefined;
  width: string | undefined;
  position: string | undefined;
  topbar: string | undefined;
  size: string | undefined;
  sidebarView: string | undefined;
  sidebar: string | undefined;
  attribute: any;
  sidebarImage: any;
  sidebarVisibility: any;
  preLoader: any;
  grd: any;


  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  loginInformation!: any;

  constructor(@Inject(DOCUMENT) private document: any, private eventService: EventService, private router: Router, public languageService: LanguageService, private offcanvasService: NgbOffcanvas,
    public _cookiesService: CookieService, public translate: TranslateService, private authService: AuthenticationService, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.element = document.documentElement;
    this.attribute = '';
    this.layout = LAYOUT_VERTICAL;
    this.mode = LAYOUT_MODE;
    this.width = LAYOUT_WIDTH;
    this.position = LAYOUT_POSITION;
    this.topbar = TOPBAR;
    this.size = SIDEBAR_SIZE;
    this.sidebarView = SIDEBAR_VIEW;
    this.sidebar = SIDEBAR_COLOR;
    this.sidebarImage = SIDEBAR_IMAGE;
    this.sidebarVisibility = SIDEBAR_VISIBILITY;
    this.preLoader = DATA_PRELOADER;


    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.cookieValue ? this.listLang.filter(x => x.lang === this.cookieValue) : [this.listLang[0]];
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    // this.eventService.subscribe(AppConsts.authorization.loginInformation, (data: GetCurrentLoginInformationsOutput) => {
    //   this.loginInformation = data;
    // });

    this.loginInformation = this.utilService.trimCharacter(sessionStorage.getItem(AppConsts.authorization.currentUser) ?? '', '"')
   
  }



  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open')
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
  * Topbar Light-Dark Mode Change
  */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.documentElement.setAttribute('data-bs-theme', "light");
        document.documentElement.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.documentElement.setAttribute('data-bs-theme', "dark");
        document.documentElement.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.documentElement.setAttribute('data-bs-theme', "light");
        break;
    }
  }

  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Español', flag: 'assets/images/flags/spain.svg', lang: 'es' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }


  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
  }

  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
      document.getElementById('page-topbar')?.classList.add('topbar-shadow')
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
    }
  }



  // Search Topbar
  Search() {
    const searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    const dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    let input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    const inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      const inputVal = input.value.toUpperCase();
      const notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        let notifiTxt = ''
        if (element.querySelector("h6")) {
          const spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
          const name = element.querySelector("h6").innerText.toLowerCase()
          if (name.includes(inputVal)) {
            notifiTxt = name
          } else {
            notifiTxt = spantext
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    const searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    const dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    const searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown.classList.remove("show");
    searchOptions.classList.add("d-none");
    searchInputReponsive.value = "";
  }

  changeLayout(layout: string) {
    this.attribute = layout;
    if (layout == 'semibox') {
      this.eventService.broadcast('changeLayout', 'vertical');
    } else {
      this.eventService.broadcast('changeLayout', layout);
    }
    document.documentElement.setAttribute('data-layout', layout);
    document.body.setAttribute('layout', layout);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });

    setTimeout(() => {
      this.attribute = document.documentElement.getAttribute('data-layout')
      if (this.attribute == 'vertical') {
        const vertical = document.getElementById('customizer-layout01') as HTMLInputElement;
        if (vertical != null) {
          vertical.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'horizontal') {
        const horizontal = document.getElementById('customizer-layout02');
        if (horizontal != null) {
          horizontal.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'twocolumn') {
        const Twocolumn = document.getElementById('customizer-layout03');
        if (Twocolumn != null) {
          Twocolumn.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'semibox') {
        const Twocolumn = document.getElementById('customizer-layout04');
        if (Twocolumn != null) {
          Twocolumn.setAttribute('checked', 'true');
        }
      }
    }, 100);
  }

  // Visibility Change
  changeVisibility(visibility: string) {
    this.sidebarVisibility = visibility;
    document.documentElement.setAttribute('data-sidebar-visibility', visibility)
  }

  // Width Change
  changeWidth(width: string, size: string) {
    this.width = width;
    document.documentElement.setAttribute('data-layout-width', width);
    document.documentElement.setAttribute('data-sidebar-size', size);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  // Position Change
  changePosition(position: string) {
    this.position = position;
    document.documentElement.setAttribute('data-layout-position', position);
  }

  // Topbar Change
  changeTopColor(color: string) {
    this.topbar = color;
    document.documentElement.setAttribute('data-topbar', color)
  }

  // Sidebar Size Change
  changeSidebarSize(size: string) {
    this.size = size;
    document.documentElement.setAttribute('data-sidebar-size', size)
  }

  // Sidebar Size Change
  changeSidebar(sidebar: string) {
    this.sidebarView = sidebar;
    document.documentElement.setAttribute('data-layout-style', sidebar);
  }

  // Sidebar Color Change
  changeSidebarColor(color: string) {
    this.sidebar = color;
    document.documentElement.setAttribute('data-sidebar', color)
  }

  // Sidebar Image Change
  changeSidebarImage(img: string) {
    this.sidebarImage = img;
    document.documentElement.setAttribute('data-sidebar-image', img);
  }

  // PreLoader Image Change
  changeLoader(loader: string) {
    this.preLoader = loader;
    document.documentElement.setAttribute('data-preloader', loader);
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(function () {
        (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
        (document.getElementById("preloader") as HTMLElement).style.visibility = "hidden";
      }, 1000);
    }
  }

  // Add Active Class
  addActive(grdSidebar: any) {
    this.grd = grdSidebar;
    document.documentElement.setAttribute('data-sidebar', grdSidebar)
    document.getElementById('collapseBgGradient')?.classList.toggle('show');
    document.getElementById('collapseBgGradient1')?.classList.add('active');
  }

  // Remove Active Class
  removeActive() {
    this.grd = '';
    document.getElementById('collapseBgGradient1')?.classList.remove('active');
    document.getElementById('collapseBgGradient')?.classList.remove('show');
  }

}
