import { OnDestroy, Component } from '@angular/core';
import { SubSink } from './subsink';

@Component({
    template: '<div></div>'
})
export class Unsubscribe implements OnDestroy {
    subscription$ = new SubSink();
    ngOnDestroy(): void {
        this.subscription$?.unsubscribe();
    }
}