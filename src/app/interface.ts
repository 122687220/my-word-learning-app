// 定义数据结构类型
export interface KeyCollocation {
    collocation: string;
    definition: string;
}

export interface WordFormData {
    word: string;
    pronunciation: string;
    part_of_speech: string;
    definition: string;
    example_sentence: string;
    root: string;
    key_collocations: KeyCollocation[];
}