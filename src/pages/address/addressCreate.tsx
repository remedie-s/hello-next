import { useState, FC, ChangeEvent, FormEvent } from "react";
import { addressReg } from "../../utils/api";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

const AddressCreatePage: FC = () => {
  const [formData, setFormData] = useState({
    buildingNumber: 0, // 숫자로 초기화
    city: "",
    detailAddress: "",
    streetName: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // buildingNumber만 숫자로 변환
    if (name === "buildingNumber") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    const { buildingNumber, ...restFormData } = formData;

    // buildingNumber가 NaN이 아닌지 확인 not a number
    if (isNaN(buildingNumber)) {
      setError("도로 번호는 숫자여야 합니다.");
      return;
    }

    const addressData = {
      buildingNumber,
      ...restFormData,
    };

    try {
      const result = await addressReg(addressData);
      setSuccess(`주소가 등록되었습니다: ${result}`);
      setFormData({
        buildingNumber: 0,
        city: "",
        detailAddress: "",
        streetName: "",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Unknown error occurred";
      setError(errorMessage);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{String(error)}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <TextField
          name="streetName"
          placeholder="도로명"
          value={formData.streetName}
          margin="normal"
          onChange={handleChange}
          required
          fullWidth
        />
        
        <TextField
          name="buildingNumber"
          placeholder="도로 번호"
          type="number" // input type을 number로 설정
          value={formData.buildingNumber}
          margin="normal"
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name="detailAddress"
          placeholder="상세 주소"
          value={formData.detailAddress}
          margin="normal"
          multiline
          maxRows={2}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name="city"
          placeholder="도시"
          value={formData.city}
          margin="normal"
          onChange={handleChange}
          required
          fullWidth
        />

        <Button variant="contained" color="success" type="submit">주소등록</Button>
      </form>
    </Box>
  );
};

export default AddressCreatePage;
