<!-- header -->
<header>
    <div class="headerWrap mainColumn">
        <div class="logo">
            <a href="{{ request()->segment(1) ? '/' : '#'}}">
                <img src="/img/logo/logo.png" alt="logo">
            </a>
        </div>
        <div class="menu_block">
            <div class="hamburger">
                <div class="hamburger1"></div>
                <div class="hamburger2"></div>
                <div class="hamburger3"></div>
            </div>
            <ul class="navigation">
                <li class="navigation__item">
                    <a class="navigation__link {{ !request()->segment(1) ? 'active' : ''}}" href="{{ request()->segment(1) ? '/' : '#'}}"><span>who we are</span></a>
                </li>
                <li class="navigation__item">
                    <a class="navigation__link {{ request()->segment(1) == 'code_of_conduct' ? 'active' : ''}}" href="{{ request()->segment(1) != 'code_of_conduct' ? '/code_of_conduct' : '#'}}"><span>code
                            of conduct</span></a>
                </li>
                <li class="navigation__item">
                    <a class="navigation__link {{ request()->segment(1) == 'services' ? 'active' : ''}}" href="{{ request()->segment(1) != 'services' ? '/services' : '#'}}"><span>services</span></a>
                </li>
                <li class="navigation__item">
                    <a class="navigation__link {{ request()->segment(1) == 'partners' ? 'active' : ''}}" href="{{ request()->segment(1) != 'partners' ? '/partners' : '#'}}"><span>partners</span></a>
                </li>
                <li class="navigation__item">
                    <a class="navigation__link {{ request()->segment(1) == 'insights' ? 'active' : ''}}" href="{{ request()->segment(1) != 'insights' ? '/insights' : '#'}}"><span>insights</span></a>
                </li>
                <li class="navigation__item">
                    <a class="navigation__link {{ request()->segment(1) == 'contacts' ? 'active' : ''}}" href="{{ request()->segment(1) != 'contacts' ? '/contacts' : '#'}}"><span>contacts</span></a>
                </li>

            </ul>
        </div>

    </div>
</header>
<!-- header end -->
<!-- content -->
<div id="content">
    <div class="whiteShield">
        <!--  it cower entire page and disappears then for smooth page loading effect  -->
    </div>

    <!--jquery-->
    <script src="/js/jquery-3.2.1.min.js" type="text/javascript"></script>

    <!--ieStub-->
    @include('modules.ieStub')

    <!--  main banner  -->
    @if($banner ?? false)
    <section id="section__main">
        <div class="backgroundImg">
            <div class="darkShadow"></div>
            <img src="/{{$banner['image']}}" alt="bg">
        </div>
        <div class="bannerContent">
            <h2>
                <span>{{$banner['title'] ?? ''}}</span>
            </h2>
            <p>{{$banner['description']}}</p>
            @if(request()->segment(1) != 'contacts')
            <a class="ctaBtn" href="/contacts">
                    contact us
            </a>
            @endif
        </div>
    </section>
    @endif
