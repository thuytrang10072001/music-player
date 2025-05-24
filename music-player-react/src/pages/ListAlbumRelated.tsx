import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { Pagination, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import CardAlbum from "../components/card/CardAlbum";
import { useGetListQuery } from "../services/AlbumApi";
import { setLoading } from "../store/LoadingSlice";
import { Album } from "@interfaces/index";


export default function ListAlbum (){
    const [ page, setPage ] = useState(1);
    const { data, isFetching } = useGetListQuery({page: page, limit: 50});
    const totalPage = data?.list.last_page

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(isFetching));
    }, [isFetching, dispatch]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };


    return (
        <Layout>
            <div className="flex-1 flex flex-col bg-bg p-3 pt-16 overflow-hidden min-h-[calc(100vh-64px)]">
                <div className="main-artists flex-shrink-0">
                    <div className="main-title flex justify-between items-center py-2">
                        <div className="title font-semibold text-xl">Album liên quan</div>
                    </div>
                </div>

                {/* Phần danh sách scroll */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="main-list py-4 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {data?.list.data.map((item: Album, index: number) =>
                                <CardAlbum data={item} key={`album-${item.spotify_id}`}/>
                            )}
                        </div>
                    </div>
                </div>
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    { totalPage > 1? (
                        <Pagination count={totalPage} color="secondary"
                                    size="large" page={page} onChange={handleChange}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: 'white',
                                        },
                                        '& .Mui-selected': {
                                            backgroundImage: 'linear-gradient(to top, #30cfd0, #330867)',
                                            color: 'white',
                                        },
                                    }}
                        />
                    ) : ('')}
                </Stack>
            </div>
        </Layout>
    );
}