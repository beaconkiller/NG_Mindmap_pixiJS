import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core'
import { heroChevronDownSolid, heroChevronUpSolid, heroClipboardDocumentCheckSolid, heroClipboardDocumentListSolid, heroCog8ToothSolid, heroHomeModernSolid, heroNewspaperSolid } from '@ng-icons/heroicons/solid'
import { bootstrapArrowLeft, bootstrapArrowRight, bootstrapArrowsAngleExpand, bootstrapArrowsMove, bootstrapCalendarCheck, bootstrapCardList, bootstrapCardText, bootstrapCashCoin, bootstrapCheckSquareFill, bootstrapChevronDoubleUp, bootstrapClipboard2CheckFill, bootstrapFileEarmark, bootstrapGearWideConnected, bootstrapGeoAlt, bootstrapHighlights, bootstrapHouseCheckFill, bootstrapPencilFill, bootstrapPersonCheck, bootstrapPersonFill, bootstrapSearch, bootstrapTrash, bootstrapXCircleFill, bootstrapXOctagon, bootstrapZoomIn, bootstrapZoomOut, bootstrapPencil, bootstrapHouse, bootstrapHouseFill, bootstrapPerson, bootstrapCameraFill, bootstrapFileEarmarkFill, bootstrapFileEarmarkRuledFill, bootstrapFileEarmarkDiffFill, bootstrapJournal, bootstrapPrinter, bootstrapPrinterFill, bootstrapDownload, bootstrapCamera, bootstrapFiles, bootstrapFolderFill, bootstrapCurrencyExchange, bootstrapEyeFill } from '@ng-icons/bootstrap-icons'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // 👈 add this


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideIcons({
      bootstrapPerson,
      bootstrapHouseFill,
      heroClipboardDocumentCheckSolid,
      heroClipboardDocumentListSolid,
      heroCog8ToothSolid,
      heroNewspaperSolid,
      heroHomeModernSolid,
      heroChevronDownSolid,
      heroChevronUpSolid,
      bootstrapArrowsAngleExpand,
      bootstrapZoomIn,
      bootstrapZoomOut,
      bootstrapGearWideConnected,
      bootstrapArrowRight,
      bootstrapArrowLeft,
      bootstrapCardText,
      bootstrapCalendarCheck,
      bootstrapPersonCheck,
      bootstrapXOctagon,
      bootstrapCardList,
      bootstrapFileEarmark,
      bootstrapArrowsMove,
      bootstrapGeoAlt,
      bootstrapTrash,
      bootstrapCheckSquareFill,
      bootstrapSearch,
      bootstrapCameraFill,
      bootstrapChevronDoubleUp,
      bootstrapPencilFill,
      bootstrapCashCoin,
      bootstrapHighlights,
      bootstrapPersonFill,
      bootstrapClipboard2CheckFill,
      bootstrapHouseCheckFill,
      bootstrapXCircleFill,
      bootstrapPencil,
      bootstrapFileEarmarkFill,
      bootstrapFileEarmarkRuledFill,
      bootstrapFileEarmarkDiffFill,
      bootstrapJournal,
      bootstrapPrinter,
      bootstrapPrinterFill,
      bootstrapDownload,
      bootstrapCamera,
      bootstrapEyeFill,
      bootstrapFolderFill,
      bootstrapCurrencyExchange,
    })
  ]
};
