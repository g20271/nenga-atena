import React, { useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import PostCardSettings from './PostCardSettings';
import { Family } from '../utils/family';
import { Sender, senderFields } from '../utils/sender';
import { Button, ButtonDiv, InputBox } from '../utils/components';
import { Part, FontSizes, LineHeights, Positions } from '../utils/style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
`;

const Index = styled.div`
  line-height: 1;
`;

const SenderSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;

const SenderTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 8px 0;
`;

const SenderField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const SenderLabel = styled.label`
  width: 5em;
  font-size: 12px;
`;

const SenderInput = styled(InputBox)`
  flex: 1;
  font-size: 12px;
`;

const SenderButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonLabel = styled.label`
  cursor: pointer;
`;

interface LeftProps {
  selectedFamilies: Family[];
  selectedFamilyIndex: number;
  sender: Sender;
  positions: Positions;
  fontSizes: FontSizes;
  lineHeights: LineHeights;
  addressMaxChars: number;
  postalCodeAdvance: number;
  senderAddressMaxChars: number;
  senderPostalCodeAdvance: number;
  setPreviousFamilyIndex: () => void;
  setNextFamilyIndex: () => void;
  setSender: (value: Sender) => void;
  setPositions: (value: Positions) => void;
  setFontSizes: (value: FontSizes) => void;
  setLineHeights: (value: LineHeights) => void;
  setAddressMaxChars: (value: number) => void;
  setPostalCodeAdvance: (value: number) => void;
  setSenderAddressMaxChars: (value: number) => void;
  setSenderPostalCodeAdvance: (value: number) => void;
  updateSenderCsvData: (text: string) => void;
  saveSenderCsv: () => void;
}

const Left = ({
  selectedFamilies,
  selectedFamilyIndex,
  sender,
  positions,
  fontSizes,
  lineHeights,
  addressMaxChars,
  postalCodeAdvance,
  senderAddressMaxChars,
  senderPostalCodeAdvance,
  setPreviousFamilyIndex,
  setNextFamilyIndex,
  setSender,
  setPositions,
  setFontSizes,
  setLineHeights,
  setAddressMaxChars,
  setPostalCodeAdvance,
  setSenderAddressMaxChars,
  setSenderPostalCodeAdvance,
  updateSenderCsvData,
  saveSenderCsv,
}: LeftProps) => {
  const [selectedPart, setSelectedPart] = useState<Part>('name');

  const handleSenderChange = (key: keyof Sender, value: string) => {
    setSender({ ...sender, [key]: value });
  };

  const readSenderCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        updateSenderCsvData(fileReader.result);
      }
    };
  };

  return (
    <Wrapper>
      <PostCard
        families={selectedFamilies}
        selectedFamilyIndex={selectedFamilyIndex}
        sender={sender}
        positions={positions}
        fontSizes={fontSizes}
        lineHeights={lineHeights}
        addressMaxChars={addressMaxChars}
        postalCodeAdvance={postalCodeAdvance}
        senderAddressMaxChars={senderAddressMaxChars}
        senderPostalCodeAdvance={senderPostalCodeAdvance}
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
      />
      <Navigation>
        <Index>
          {selectedFamilyIndex + 1} / {selectedFamilies.length}
        </Index>
        <Button type="button" value="前へ" onClick={setPreviousFamilyIndex} />
        <Button type="button" value="次へ" onClick={setNextFamilyIndex} />
      </Navigation>
      <PostCardSettings
        selectedPart={selectedPart}
        positions={positions}
        fontSizes={fontSizes}
        lineHeights={lineHeights}
        addressMaxChars={addressMaxChars}
        postalCodeAdvance={postalCodeAdvance}
        senderAddressMaxChars={senderAddressMaxChars}
        senderPostalCodeAdvance={senderPostalCodeAdvance}
        setSelectedPart={setSelectedPart}
        setPositions={setPositions}
        setFontSizes={setFontSizes}
        setLineHeights={setLineHeights}
        setAddressMaxChars={setAddressMaxChars}
        setPostalCodeAdvance={setPostalCodeAdvance}
        setSenderAddressMaxChars={setSenderAddressMaxChars}
        setSenderPostalCodeAdvance={setSenderPostalCodeAdvance}
      />
      <SenderSection>
        <SenderTitle>差出人</SenderTitle>
        <SenderButtons>
          <ButtonLabel>
            <ButtonDiv>CSV を開く</ButtonDiv>
            <FileInput type="file" onChange={readSenderCsvFile} />
          </ButtonLabel>
          <Button type="button" value="CSV を保存" onClick={saveSenderCsv} />
        </SenderButtons>
        {senderFields.map(({ key, label }) => (
          <SenderField key={key}>
            <SenderLabel>{label}</SenderLabel>
            <SenderInput
              type="text"
              value={sender[key]}
              onChange={(e) => handleSenderChange(key, e.target.value)}
            />
          </SenderField>
        ))}
      </SenderSection>
    </Wrapper>
  );
};

export default Left;
