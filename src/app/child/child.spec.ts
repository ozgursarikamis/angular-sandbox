import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ParentComponent } from "../parent/parent.component";
import { ChildComponent } from "./child.component";
import { By } from "@angular/platform-browser";

describe('ParentComponent with ChildComponent', () => {
    let fixture: ComponentFixture<ParentComponent>;
    let parentComponent: ParentComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // declarations: [ParentComponent, ChildComponent]
            imports: [ParentComponent, ChildComponent] // standalones
        }).compileComponents();

        fixture = TestBed.createComponent(ParentComponent);
        parentComponent = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should update parent value when child button is clicked', () => {
        const button = fixture.debugElement.query(By.css('button'));

        // Simulate click:
        button.triggerEventHandler('click', null);

        // Expect parent to have updated value:
        expect(parentComponent.message).toBe('emitting message')
    });
});