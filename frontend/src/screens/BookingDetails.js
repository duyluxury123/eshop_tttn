import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { getUserBooking } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import { format } from 'date-fns';
import Meta from '../utils/Meta';

const BookingDetails = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const [dates, setDates] = useState([]);
    const { isLoading, booking } = useSelector((state) => state.hotelState);
    const user = useSelector((state) => state.userState.user);
    const prices = booking?.room.pricePerDay * dates?.length;
    const vat = booking?.room.pricePerDay * dates?.length * (18 / 100);

    useEffect(() => {
        dispatch(getUserBooking(id));
    }, [id, dispatch])

    useEffect(() => {
        if (booking) {
            const tempDates = booking.dates.map((date) => format(new Date(date), 'yyyy-MM-dd'))
            setDates(tempDates);
        }
    }, [booking]);

    return (
        <Fragment>
            <Meta title="Booking Details" />
            <Fragment>
                {isLoading ? <Loader /> : (
                    <Fragment>
                        {!booking ? <NotFound /> : (
                            <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4 flex flex-col md:flex-row  md:justify-between">
                                <div className="flex flex-col items-center">
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium md:mt-5 mb-4">Thông tin của bạn:</h2>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="name" className="font-medium w-16">Tên</label>
                                            <input value={user?.name} disabled={true} id="name" type="text" className="outline-none py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400 text-gray-700 font-mono" />
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="email" className="font-medium w-16">Email:</label>
                                            <input value={user?.email} id="email" type="email" className="outline-none py-2 px-1 sm:px-2  rounded-md border border-solid border-gray-400 text-gray-700 font-mono" disabled={true} />
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <label htmlFor="phone" className="font-medium w-16">Số điện thoại:</label>
                                            <input value={booking?.phone} disabled={true} placeholder="Your phone number" id="phone" type="number" className="outline-none py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400  font-mono" />
                                        </div>
                                    </div>
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium mb-4 mt-16">Chi tiết phòng:</h2>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Tên khách sạn:</span>
                                            <Link to={`/hotel/${booking?.hotel._id}`} className="font-mono text-blue-700">{booking?.hotel.name}</Link>
                                        </div>
                                        <div className="ml-8 flex  mb-4">
                                            <span className="font-medium inline-block  w-28">Tên phòng:</span>
                                            <span className="font-mono">{booking?.room.name}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Phòng số:</span>
                                            <span className="font-mono">{booking?.room.number}</span>
                                        </div>
                                        <div className="ml-8 flex items-center mb-4">
                                            <span className="font-medium inline-block  w-28">Loại phòng:</span>
                                            <span className="font-mono">{booking?.room.type}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28">Giá(1 ngày):</span>
                                            <span className="font-mono">{booking?.room.pricePerDay} $</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center" >
                                    <div className="px-1 sm:px-3">
                                        <h2 className="text-xl font-medium mb-4 mt-16 md:mt-5">Chi tiết đặt phòng:</h2>
                                        <div className="ml-8 flex  mb-4">
                                            <span className="font-medium inline-block  w-28">Số phòng:</span>
                                            <span className="font-mono break-all">{booking?.room._id}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28"> Trạng thái:</span>
                                            <span className="font-mono">{booking?.status}</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Ngày:</span>
                                            <textarea value={dates?.toString()} disabled={true} id="phone" rows={dates.length + 1} cols={10} className="py-2 px-1 sm:px-2 rounded-md border border-solid border-gray-400 text-gray-700 font-mono break-all resize-none" />
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Giá({dates?.length}):</span>
                                            <span className="font-mono">{prices} taka</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block  w-28">Thuế:</span>
                                            <span className="font-mono">{vat} $</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28">Tổng cộng:</span>
                                            <span className="font-mono">{booking?.totalPrice} $</span>
                                        </div>
                                        <div className="ml-8 flex mb-4">
                                            <span className="font-medium inline-block w-28"> Thanh toán:</span>
                                            <span className="font-mono">{booking?.paymentInfo.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                )}
            </Fragment>
        </Fragment>
    )
}
export default BookingDetails;