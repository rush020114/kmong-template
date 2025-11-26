import { axiosInstance } from './axiosInstance';

/**
 * Item API 함수들
 */
const itemApi = {
    /**
     * Item 목록 조회
     */
    getAll: async () => {
        const response = await axiosInstance.get('/items');
        return response.data;
    },

    /**
     * Item 상세 조회
     */
    get: async id => {
        const response = await axiosInstance.get(`/items/${id}`);
        return response.data;
    },

    /**
     * Item 등록 (이미지 포함)
     * @param {File} mainImage - 메인 이미지
     * @param {File[]} subImages - 서브 이미지 배열
     * @param {Object} itemData - Item 정보 {title, content}
     */
    reg: async (mainImage, subImages, itemData) => {
        const formData = new FormData();
        
        // 메인 이미지
        formData.append('mainImage', mainImage);
        
        // 서브 이미지
        if (subImages && subImages.length > 0) {
            subImages.forEach(img => formData.append('subImages', img));
        }
        
        // DTO
        const dtoBlob = new Blob(
            [JSON.stringify(itemData)],
            { type: 'application/json' }
        );
        formData.append('dto', dtoBlob);
        
        const response = await axiosInstance.post('/items', formData);
        return response.data;
    },

    /**
     * Item 수정
     */
    update: async (id, itemData) => {
        const response = await axiosInstance.put(`/items/${id}`, itemData);
        return response.data;
    },

    /**
     * Item 삭제
     */
    delete: async id => {
        const response = await axiosInstance.delete(`/items/${id}`);
        return response.data;
    },
};

export default itemApi;