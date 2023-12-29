import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="full-page">
      <div className="container mt-5 bg-light p-4 rounded content-container">
        <h1>Chào mừng đến trang quản lý</h1>
        <p>Đây là trang chủ quản lý của ứng dụng GHLE</p>
        <Link href="/login">
          <div className="btn btn-primary">Đăng nhập để tiếp tục</div>
        </Link>
      </div>
    </div>
  )
}
