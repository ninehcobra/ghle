const ModalEditUser = () => {
    return (
        <Modal show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
                <Modal.Title>Tạo người dùng mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    {/* Add form fields for new user */}
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
                            name="email"
                            value={newUser.email}
                            onChange={handleFormChange}
                            required
                        />
                        <Form.Label>Mật khẩu:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            value={newUser.password}
                            onChange={handleFormChange}
                            required
                        />
                        <Form.Label>Địa chỉ:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ"
                            name="address"
                            value={newUser.address}
                            onChange={handleFormChange}
                            required
                        />
                        <Form.Label>Tên:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            name="name"
                            value={newUser.name}
                            onChange={handleFormChange}
                            required
                        />
                        <Form.Label>Số điện thoại:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="nhập Số điện thoại"
                            name="phoneNumber"
                            value={newUser.phoneNumber}
                            onChange={handleFormChange}
                            required
                        />
                        <div>
                            <div>
                                <Form.Label style={{ marginTop: '8px' }}>Tỉnh / Thành phố :</Form.Label>
                                <select value={newUser.provinceId} onChange={(e) => onChangePicker(e.target.value, 'provinceId')} style={{ marginLeft: '8px' }} >
                                    <option key={0} value={''}>Chọn Tỉnh / Thành phố</option>
                                    {arrProvince ?
                                        arrProvince.map((province) => {
                                            return (
                                                <option value={province.id} key={province.id}>{province.name}</option>
                                            )
                                        })
                                        : ''}
                                </select>
                            </div>
                            <div>
                                <Form.Label style={{ marginTop: '8px' }}>Quận / Huyện :</Form.Label>
                                <select value={newUser.districtId} onChange={(e) => onChangePicker(e.target.value, 'districtId')} style={{ marginLeft: '8px' }} >
                                    <option key={0} value={''}>Chọn Quận / Huyện</option>
                                    {arrDistrict ?
                                        arrDistrict.map((district) => {
                                            return (
                                                <option value={district.id} key={district.id}>{district.name}</option>
                                            )
                                        })
                                        : ''}
                                </select>
                            </div>
                            <div>
                                <Form.Label style={{ marginTop: '8px' }}>Quyền :</Form.Label>
                                <select value={newUser.roleId} onChange={(e) => onChangePicker(e.target.value, 'roleId')} style={{ marginLeft: '8px' }} >
                                    <option key={0} value={''}>Chọn quyền</option>
                                    <option key={0} value={1}>Admin</option>
                                    <option key={0} value={2}>Khách hàng</option>
                                    <option key={0} value={3}>Shipper</option>
                                    <option key={0} value={4}>Quản lý kho</option>

                                </select>
                            </div>
                        </div>

                    </Form.Group>
                    {/* Repeat similar fields for other user properties */}
                    <Button onClick={handleFormSubmit} style={{ marginTop: '12px' }} variant="primary" type="submit">
                        Save
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalEditUser