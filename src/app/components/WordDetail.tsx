import React from 'react';
import { WordFormData } from '@/app/interface';

const Index = ({ currentWord, showBorder = false }: { currentWord: WordFormData | null; showBorder?: boolean }) => {
    if (!currentWord) {
        return null
    }
    return (
        <div style={showBorder ? { borderBottom: '1px #eee solid', marginBottom: '10px' } : {}}>
            <p><strong>Word:</strong> {currentWord.word}</p>
            <p><strong>Pronunciation:</strong> {currentWord?.pronunciation}</p>
            <p><strong>Definition:</strong> {currentWord?.definition}</p>
            <p><strong>Example Sentence:</strong> {currentWord?.example_sentence}</p>
            <p><strong>Part of Speech:</strong> {currentWord?.part_of_speech}</p>
            <p><strong>Root:</strong> {currentWord?.root}</p>
            <h4>Key Collocations:</h4>
            <ul>
                {currentWord?.key_collocations?.map((collocation, index) => (
                    <li key={index}>
                        <strong>{collocation.collocation}:</strong> {collocation.definition}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default React.memo(Index)