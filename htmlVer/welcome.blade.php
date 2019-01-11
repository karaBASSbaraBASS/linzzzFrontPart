@extends('layouts.app')

@section('content')
    <!--how we work start-->
    @if($infoblocks->count())
        <section class="howWeWork mainpageSection">
            <div class="contentPageWrap lightBlock">
                <div class="flexRow rowWrap wayCardWrap">
                    @foreach($infoblocks as $infoblock)
                        <div class="wayCard">
                            <div class="watCardImg">
                                <img src="/{{$infoblock->image}}" alt="step img">
                            </div>
                            <span>{{$infoblock->title}}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
    <!--how we work end-->
    <!--aboutUs start-->
    @if($about_us->count())
        <section class="aboutUs mainpageSection">
            <div class="contentPageWrap darkBlock">
                <div class="flexCol">
                    <div class="headingWrap">
                        <div class="headingBlock">
                            <h2>OUR PARTNERS</h2>
                        </div>
                    </div>
                </div>
                <div class="flexRow textSquaresWrap">
                    @foreach($about_us as $block)
                        <div class="textSquare col-33">
                            <div class="imageWrap">
                                <img src="/{{$block->image}}" alt="squareBg">
                            </div>
                            <div class="whitesShadow"></div>
                            <div class="floatingHeader">
                                <h4>{{$block->title}}</h4>
                            </div>
                            <div class="floatingCaption">
                                <span>{{$block->content}}</span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
    <!--aboutUs end-->
    <!--benefits start-->
    @if($benefits)
        <section class="benefits mainpageSection">
            <div class="contentPageWrap lightBlock">
                <div class="flexCol">
                    <div class="headingWrap">
                        <div class="headingBlock">
                            <h2>benefits</h2>
                        </div>
                    </div>
                </div>
                <div class="flexRow userCardWrap">
                    <div class="col-66 bigCard">
                        <div class="forOwners expCol">
                            <h4 class="cardHeading">For owners:</h4>
                            <ul class="benefitsList">
                                @foreach($benefits->for_owners as $item)
                                    <li class="benefitsList_item">
                                        <h5>{{$item['title']}}</h5>
                                        <span>{{$item['description']}}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="forCFOs expCol">
                            <h4 class="cardHeading">For CFOs:</h4>
                            <ul class="benefitsList">
                                @foreach($benefits->for_cfos as $item)
                                    <li class="benefitsList_item">
                                        <h5>{{$item['title']}}</h5>
                                        <span>{{$item['description']}}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-33 lightBlock">
                        <div class="flexCol">
                            <div class="headingWrap">
                                <div class="headingBlock">
                                    <h3>Client profile</h3>
                                </div>
                            </div>
                            <div class="clientInfoCol smallCard">
                                <ul class="benefitsList">
                                    @foreach($benefits->clients as $item)
                                        <li class="benefitsList_item">
                                            <h4 class="cardHeading">{{$item['title']}}</h4>
                                            <span>{{$item['description']}}</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endif
    <!--benefits end-->
    <!--advantages start-->
    @if($advantages->count())
        <section class="advantages mainpageSection">
            <div class="contentPageWrap darkBlock">
                <div class="flexCol">
                    <div class="headingWrap">
                        <div class="headingBlock">
                            <h2>Advantages</h2>
                        </div>
                    </div>
                </div>
                <div class="flexRow textSquaresWrap">
                    @foreach($advantages as $advantage)
                        <div class="textSquare col-33">
                            <div class="imageWrap">
                                <img src="/{{$advantage->image}}" alt="advantageBg">
                            </div>
                            <div class="whitesShadow"></div>
                            <div class="floatingHeader">
                                <h4>{{$advantage->title}}</h4>
                            </div>
                            <div class="floatingCaption">
                                <span>{{$advantage->content}}</span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
    <!--advantages end-->
    <!--slider start-->
    @if($services->count())
        <section class="capabilities mainpageSection">
            <div class="contentPageWrap lightBlock">
                <div class="flexCol">
                    <div class="headingWrap">
                        <div class="headingBlock">
                            <h2>capabilities</h2>
                        </div>
                    </div>
                    <div class="sliderBlock">
                        @foreach($services as $service)
                            <div class="sliderItem">
                                <div class="sliderItemWrap">
                                    <div class="image-col" >
                                        <img class="image-col__Item" src="/{{$service->image}}" alt="slide image">
                                    </div>
                                    <div class="text-col">
                                        <h3>{{$service->title}}</h3>
                                        <div class="slideCaption">
                                            <p>{{$service->description}}</p>
                                        </div>
                                        <a class="sliderCta" href="/services/{{$service->slug}}">details</a>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </section>
    @endif
    <!--slider end-->
    <!--insights start-->
    @if($insights->count())
        <section class="insights mainpageSection">
            <div class="contentPageWrap darkBlock">
                <div class="flexCol">
                    <div class="headingWrap">
                        <div class="headingBlock">
                            <h2>Insights</h2>
                        </div>
                    </div>
                </div>
                <div class="flexRow insights__Wrap">
                    @foreach($insights as $insight)
                        <a href="/insights/{{$insight->slug}}" class="insights__Item">
                            <div class="image-col" >
                                <img class="image-col__Item" src="{{$insight->mini_image}}" alt="slide image">
                            </div>
                            <div class="text-col">
                                <h3>{{$insight->title}}</h3>
                                <div class="insights__Caption">
                                    <p>{{strlen($insight->description ?? '') > 50 ? substr($insight->description ?? '',0,50)."..." : $insight->description ?? ''}}</p>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
    <!--insights end-->
@endsection