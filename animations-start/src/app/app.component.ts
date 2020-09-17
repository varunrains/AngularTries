import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes,group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        //normal CSS way of transforming
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        //Javascript way of defining styles
        'background-color': 'blue',
        transform: 'translateX(200px) scale(1)'
      }
      )),
      state('shrunken', style({
        //Javascript way of defining styles
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      }
      )),
      //State transition
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      //if you want to specify same animate time then you can use
      //'normal <=> highlighted' only once
      // transition('normal <=> highlighted', animate(300)),
      // <=> to and fro from any state to shrunken
      transition('shrunken <=> *', [
        //Different phases of animation
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    //Adding your second trigger for the list
    trigger('list1', [
      //'in' is just a dummy state not important
      state('in', style({
        opacity: 1,
        //normal CSS way of transforming
        transform: 'translateX(0)'
      })),
      //You can use 'void' for the element
      //which is not yet added to DOM
      //'void' is a reserved state
      transition('void => *', [style({
        opacity: 0,
        transform:'translate(-100px)'
      }), animate(300)]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity:0
        }))
      ])
    ]),
    trigger('list2', [
      //'in' is just a dummy state not important
      state('in', style({
        opacity: 1,
        //normal CSS way of transforming
        transform: 'translateX(0)'
      })),
      //You can use 'void' for the element
      //which is not yet added to DOM
      //'void' is a reserved state
      transition('void => *', [
        //keyframes will give you indepth access to animation
        //inside 1 second you can define your animation
        //at different interval
        animate(1000, keyframes([
          //3 styles means 1/3 second of 1000  for each state
          //to execute
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            //controls the time in milliseconds
            offset:0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            //30% of animation time
            offset:0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset:0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            //100% of animation time
            //final key frame of animation
            offset: 1
          })
        ]))
        ]),
      transition('* => void', [
        //using group you can run the
        //animations parallellely
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
          ])
      ])
    ])
    ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state == 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState == 'normal' ? 'highlighted' : 'normal';
  }

  onShrunken() {
    this.wildState = 'shrunken';
  }

  animationStarted(event) {
    console.log('Animation Start:' + JSON.stringify(event));
  }

  animationDone(event) {
    console.log('Animation Done:' + JSON.stringify(event));
  }

  onDelete(item) {
    this.list.pop();
  }

  onAdd(item) {
      this.list.push(item);
  }

 
}
