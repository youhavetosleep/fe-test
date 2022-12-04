import { useEffect, useState } from "react";
import styled from "styled-components";
import HouseList from "@components/house/HouseList";
import SelectComponent from "@components/select";
import House from "@model/House";
import { useGetHouseListQuery } from "@network/queries";
import { CATEGORY, sortOptionType, OptionsType, typeOptions } from "@constants/index";

const HouseListView = () => {
    const { isLoading, data: houseListQueryResult } = useGetHouseListQuery();

    const [list, setList] = useState<House[] | undefined>(houseListQueryResult || []);
    const [sortOption, setSortOption] = useState<sortOptionType>({ type: CATEGORY.ALL, options: [] });

    const houseTypeOptions =
        houseListQueryResult?.map((house) => ({ label: house.houseType, value: house.houseType })) || [];

    const universityOptions =
        houseListQueryResult?.map((house) => ({ label: house.university, value: house.university })) || [];

    const filterDeduplicationOptions = (list: OptionsType[]) => {
        const DeduplicationOptions = list.reduce((acc: OptionsType[], current) => {
            if (acc.findIndex(({ label }) => label === current.label) === -1) {
                acc.push(current);
            }
            return acc;
        }, []);
        return DeduplicationOptions;
    };
    const filterCategory = (type: string) => {
        if (type === CATEGORY.ALL) setSortOption({ type: type, options: [] });
        if (type === CATEGORY.HOUSE_TYPE) setSortOption({ type: type, options: houseTypeOptions });
        if (type === CATEGORY.UNIVERSITY) setSortOption({ type: type, options: universityOptions });
        setList(houseListQueryResult);
    };

    const filterList = (detailType: string) => {
        if (!!!detailType) return setList(houseListQueryResult);
        const list: House[] | any[] = houseListQueryResult || [];
        const filteredList = list.filter((item) => item[sortOption.type] === detailType);
        setList(filteredList);
    };

    useEffect(() => {
        if (!isLoading) setList(houseListQueryResult);
    }, [isLoading]);

    return (
        <>
            <SortContainer>
                <SelectContainer>
                    <SelectTitle>분류</SelectTitle>
                    <SelectComponent defaultNone options={typeOptions} onChange={filterCategory} />
                </SelectContainer>
                {sortOption.type !== CATEGORY.ALL ? (
                    <SelectContainer>
                        <SelectTitle>옵션</SelectTitle>
                        <SelectComponent
                            options={filterDeduplicationOptions(sortOption.options)}
                            onChange={filterList}
                        />
                    </SelectContainer>
                ) : null}
            </SortContainer>

            {<HouseList list={list || []} />}
        </>
    );
};

export default HouseListView;

const SortContainer = styled.div`
    display: flex;
    padding: 5px 10px;
    justify-content: flex-start;
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
`;

const SelectTitle = styled.h4``;