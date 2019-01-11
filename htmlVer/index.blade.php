@extends('layouts.app')
@section('content')
    <section class="contentPage">
        <div class="contentPageWrap lightBlock">
            <div class="flexCol">
                <div class="headingWrap">
                    <div class="headingBlock">
                        <h1>{{$page->title}}</h1>
                    </div>
                </div>
                <div class="servicesSquaresWrap">
                    @foreach($services as $service)
                        <a href="#" class="servicesSquares__item">
                            <div class="imageWrap">
                                <img src="/{{$service->mini_image}}" alt="squareBg">
                            </div>
                            <div class="redShadow"></div>
                            <div class="floatingHeader">
                                <h4>{{$service->title}}</h4>
                            </div>
                            <div class="floatingCaption">
                                <span>{{$service->description}}</span>
                            </div>
                        </a>
                    @endforeach
                </div>
                {{$services->links()}}
            </div>
        </div>
    </section>
@endsection
