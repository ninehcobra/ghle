'use client'

import Link from "next/link"
import { getUserAccount } from "../services/userService"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function RootLayout({ children }) {

    const [info, setInfo] = useState()
    const [roleId, setRoleId] = useState()
    const router = useRouter()

    const fetchAccount = async () => {
        let res = await getUserAccount()
        if (res && res.EC === 0 && res.DT.roles.id !== 2) {
            setRoleId(res.DT.roles.id)
            setInfo(res.DT)
        }
        else {
            router.push('/login')
        }
    }

    useEffect(() => {
        fetchAccount()
    }, [])


    return (
        <div>
            <div className="dashboard-page">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link href="/dashboard">
                            <div className="navbar-brand">GHLE</div>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div style={{ display: 'flex', justifyContent: "space-between" }} className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                {roleId === 1 ?
                                    <>
                                        <li className="nav-item">
                                            <Link href="/dashboard/user">
                                                <div className="nav-link">Quản lý người dùng</div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/dashboard/warehouse">
                                                <div className="nav-link">Kho hàng</div>
                                            </Link>
                                        </li>
                                    </>
                                    : ''
                                }

                                {
                                    roleId === 1 || roleId === 4 ?
                                        <>

                                            <li className="nav-item">
                                                <Link href="/dashboard/mywarehouse">
                                                    <div className="nav-link">Quản lý Kho hàng</div>
                                                </Link>
                                            </li>
                                        </>
                                        : ''
                                }
                                {
                                    roleId === 1 || roleId === 3 ?
                                        <li className="nav-item">
                                            <Link href="/dashboard/order">
                                                <div className="nav-link">Quản lý đơn hàng</div>
                                            </Link>
                                        </li> : ''
                                }
                            </ul>
                            <div className="nav-item">
                                <Link href="/">
                                    <div className="nav-link">Đăng xuất</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container mt-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
