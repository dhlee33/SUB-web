import React from 'react';
import { Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption } from 'reactstrap';


class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.onExited = this.onExited.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const items = this.props.items ? this.props.items : [];
    return (
      <div style={{margin: '0 20px'}}>
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="car1"
        interval={false}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {items.map(i =>
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={i.src}
          >
            <div style={{ textAlign: 'center', height: '350px', position: 'relative'}}>
              <img src={i.src} alt={i.altText} style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}/>
            </div>
            <CarouselCaption captionText={i.caption} captionHeader={i.caption} />
          </CarouselItem>
      )}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </div>
    );
  }
}

export default Images;
