<!DOCTYPE html>
<html lang="en">
  	<head>
		<title>Make-your-trip: Lên kế hoạch chuyến đi</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="{{url('client/css/bootstrap.css')}}">
		<link rel="stylesheet" type="text/css" href="{{url('client/css/font-awesome.min.css')}}">
		<link rel="stylesheet" type="text/css" href="{{url('client/css/style.css')}}">
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700|Open+Sans:700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="{{url('client/css/myCSS/myCSS-index.css')}}">



	</head>
	<body>
    
    <div id="home">
    	<div class="headerLine">
	<div id="menuF" class="default">
		<div class="container">
			<div class="row">
				<div class="logo col-md-4">
					<div>
						<a href="#">
							<img src="{{url('client/images/logo.png')}}">
						</a>
					</div>
				</div>
				<div class="col-md-8">
					<div class="navmenu">
						<ul id="menu">
							<li>
					          	<a onclick="fadeLogin()"><b>Đăng nhập</b> <span class="caret"></span></a>
								<ul id="login-dp" class="dropdown-menu">
									<li>
										<div class="row">
											<div class="col-md-12">
												Đăng nhập với
												<div class="social-buttons">
													<a href="{{url('redirect/github')}}" class="btn btn-primary"><i class="fa fa-github" aria-hidden="true"></i>Github</a>
												</div>
											</div>
										</div>
									</li>
								</ul>
					        </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
		<div class="container">
			<div class="row wrap">
				<div class="col-md-12 gallery"> 
					<div id="headerwrap">
				      	<div class="container">
					        <div class="row">
					        <h3>Tìm kiếm nơi thuộc về bạn !</h3>
					          <div class="span12">
					          	<form method="get" class="ui-widget">
						            <input type="text" name="key" id="key" class="" required="required" placeholder="Nhập nơi bạn muốn đi du lịch" class="cform-text" size="40">
						            <button id="btnsearch"><i class="fa fa-search fa-lg"></i><b> Tìm kiếm</b></button>
					            </form>
					          </div>
					        </div>
				    	</div>
				  	</div>
				</div>
			</div>
		</div>
	</div>
    <div class="container">
		<div class="row">
				<div id="options" class="col-md-12">	
					<ul id="filter" class="option-set" data-option-key="filter">
						<li><a class="selected" href="#filter" data-option-value="*" class="current">Tất cả</a></li>
						<li><a href="#filter" data-option-value=".eating">Ăn uống</a></li>
						<li><a href="#filter" data-option-value=".playing">Vui chơi</a></li>
						<li><a href="#filter" data-option-value=".drive">Ngắm cảnh</a></li>
					</ul>
				</div>

<!-- Khi bấm vào xem chi tiết -->
			<div class="portfolio_block pretty" data-animated="fadeIn">	
					<div class="element col-sm-4   gall playing ">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic1.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic1.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					<div class="element col-sm-4  gall playing">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic2.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic2.jpg')}}" alt="pic2 Gallery"/>
						</a>
						<div class="view project_descr center">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					<div class="element col-sm-4  gall drive">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic3.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic3.jpg')}}" alt="pic3 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>	
					
					<div class="element col-sm-4  gall  text_styles">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic4.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic4.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					<div class="element col-sm-4  gall  drive">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic9.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic9.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr center">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					<div class="element col-sm-4  gall  eating">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic6.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic6.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>		
					<div class="element col-sm-4   gall playing">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic7.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic7.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					
					<div class="element col-sm-4  gall text_styles">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic9.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic9.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>
					
					<div class="element col-sm-4  gall eating">
						<a class="readmore" href="info.html">Xem chi tiết</a>
						<a class="plS" href="{{url('client/images/prettyPhotoImages/pic9.jpg')}}" rel="prettyPhoto[gallery2]">
							<img class="img-responsive picsGall" src="{{url('client/images/prettyPhotoImages/thumb_pic9.jpg')}}" alt="pic1 Gallery"/>
						</a>
						<div class="view project_descr ">
							<h3><a href="info.html" title="tiêu dề chi tiết">Tiêu đề bài viết</a></h3>
							<ul>
								<li class="adrs" title="Địa chỉ chi tiết">Địa chỉ bài viết</li>
								<li><i class="fa fa-eye"></i>123</li>
								<li><a href=""><i class="fa fa-heart-o"></i>12312</a></li>
							</ul>
						</div>
					</div>			
				</div>
			</div>

			<!-- Ajax hiển thị thêm bài viết -->
			<center><a href="">Xem thêm</a></center>
			<!-- End -->
		</div>
		<div class="lineBlack">
			<div class="container">
				<div class="row downLine">
					<div class="col-md-6"></div>
					<div class="col-md-6 text-right dm">
						<p>Copyright  2017 &copy; Thiết kế và lập trình bởi sinh viên ĐH Khoa Học Tự Nhiên!</p>
					</div>
				</div>
			</div>
		</div>
    </div>   
	</body>
	<script type="text/javascript" src="{{url('client/js/jquery-1.8.3.min.js')}}"></script>
	<script type="text/javascript" src="{{url('client/js/jquery.mobile.customized.min.js')}}"></script>
	<script type="text/javascript" src="{{url('client/js/sorting.js')}}"></script>
	<script type="text/javascript" src="{{url('client/js/jquery.isotope.js')}}"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
	<script type="text/javascript" src="{{url('client/js/myJS/myJS-index.js')}}"></script>
</html>