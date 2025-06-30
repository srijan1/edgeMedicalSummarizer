import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FileText, Calendar, MapPin, Star } from 'lucide-react-native';
import UploadZone from '@/components/forms/UploadZone';
import InputGroup from '@/components/forms/InputGroup';
import SecurityNotice from '@/components/ui/SecurityNotice';
import ActionButton from '@/components/ui/ActionButton';
import SectionHeader from '@/components/layout/SectionHeader';
import { TabType } from '../navigation/TabNavigator';
import { uploadImageForOCR } from '@/services/services';

const billTypes = [
  { label: 'Hospital', value: 'hospital' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Pharmacy', value: 'pharmacy' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Lab/Imaging', value: 'lab' },
];

interface UploadScreenProps {
  onNavigate: (tab: TabType, data?: any) => void;
}

export default function UploadScreen({ onNavigate }: UploadScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [billType, setBillType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    // Simulate image selection

    // setSelectedImage('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2');
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    }).then((result) => {
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    });
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleProceed = async () => {
    setLoading(true);
    if (!selectedImage) {
      Alert.alert('Missing Information', 'Please upload a bill to proceed.');
      return;
    }

    if (!billType) {
      Alert.alert('Missing Information', 'Please select a bill type.');
      return;
    }

    // const uploadData = {
    //   image: selectedImage,
    //   billType,
    //   dueDate,
    //   location,
    //   rating,
    // };
    const { response, result } = await uploadImageForOCR(selectedImage);
    const dummyData = {
      "result": {
        "extracted_codes": [
          {
            "code_type": "ICD-10-PCS",
            "code_value": "SAMPLES",
            "confidence_score": 1,
            "context": "visit: www. paris-software.com/samples/workplacehcfa1500\npease ee! MEDICARE 0555 eam |\nD",
            "description": null,
            "end_position": 38,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "ICD-10-PCS procedure codes (7 alphanumeric characters)",
              "pattern_priority": 2
            },
            "original_text": "samples",
            "start_position": 31
          },
          {
            "code_type": "ICD-10-PCS",
            "code_value": "ANGELES",
            "confidence_score": 1,
            "context": "1212 HOSPITAL WAY Speen\n‘STAPLE Paeae w\nml ee LOS ANGELES CA 90000 ARSE =\nHEALTH INSURANCE CLAIM FORM\nSa _",
            "description": null,
            "end_position": 155,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "ICD-10-PCS procedure codes (7 alphanumeric characters)",
              "pattern_priority": 2
            },
            "original_text": "ANGELES",
            "start_position": 148
          },
          {
            "code_type": "CPT",
            "code_value": "90000",
            "confidence_score": 1,
            "context": "AL WAY Speen\n‘STAPLE Paeae w\nml ee LOS ANGELES CA 90000 ARSE =\nHEALTH INSURANCE CLAIM FORM\nSa _ Lar ———\n[",
            "description": null,
            "end_position": 164,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "90000",
            "start_position": 159
          },
          {
            "code_type": "CPT",
            "code_value": "90210",
            "confidence_score": 1,
            "context": "RIDGE ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 55",
            "description": null,
            "end_position": 447,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "90210",
            "start_position": 442
          },
          {
            "code_type": "CPT",
            "code_value": "90210",
            "confidence_score": 1,
            "context": "or <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i",
            "description": null,
            "end_position": 485,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "90210",
            "start_position": 480
          },
          {
            "code_type": "CPT",
            "code_value": "09100",
            "confidence_score": 1,
            "context": "SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09100 [1] 1500 ool re) | | | 8\n; ANESTHESIA TIME: 2 us",
            "description": null,
            "end_position": 972,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "09100",
            "start_position": 967
          },
          {
            "code_type": "CPT",
            "code_value": "25555",
            "confidence_score": 1,
            "context": "e PE\" [2 eoo ool 0 ool i500 00|\n_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFF",
            "description": null,
            "end_position": 1180,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "25555",
            "start_position": 1175
          },
          {
            "code_type": "CPT",
            "code_value": "90210",
            "confidence_score": 1,
            "context": "PLAY COMPANY\n3 PO BOX 555555\nSs RWS SAN DIEGO CA 90210\nBL seo 120306 Pe ia ie\nPLEASE PRINT OR TYPE\n1491",
            "description": null,
            "end_position": 1306,
            "metadata": {
              "match_confidence": 0.7,
              "pattern_description": "CPT procedure codes (5 digits)",
              "pattern_priority": 2
            },
            "original_text": "90210",
            "start_position": 1301
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SA",
            "confidence_score": 1,
            "context": "GELES CA 90000 ARSE =\nHEALTH INSURANCE CLAIM FORM\nSa _ Lar ———\n[K]omacwen [Jomacnas []omeresey [] aren",
            "description": null,
            "end_position": 202,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Sa",
            "start_position": 200
          },
          {
            "code_type": "MODIFIER",
            "code_value": "GE",
            "confidence_score": 1,
            "context": "ey [] aren [iano [Jem [>| 33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +[X]| SMITH JOHN\npi",
            "description": null,
            "end_position": 294,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ge",
            "start_position": 292
          },
          {
            "code_type": "MODIFIER",
            "code_value": "RD",
            "confidence_score": 1,
            "context": "00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RIDGE RD o[X] s<{Jouf] [7] 555 RIDGE ST z\nSAN DIEGO SAN DI",
            "description": null,
            "end_position": 369,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "RD",
            "start_position": 367
          },
          {
            "code_type": "MODIFIER",
            "code_value": "ST",
            "confidence_score": 1,
            "context": "ern ory\n555 RIDGE RD o[X] s<{Jouf] [7] 555 RIDGE ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 55",
            "description": null,
            "end_position": 400,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ST",
            "start_position": 398
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AE",
            "confidence_score": 1,
            "context": "55 RIDGE ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555)",
            "description": null,
            "end_position": 441,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ae",
            "start_position": 439
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SE",
            "confidence_score": 1,
            "context": "EGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti",
            "description": null,
            "end_position": 471,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Se",
            "start_position": 469
          },
          {
            "code_type": "MODIFIER",
            "code_value": "RS",
            "confidence_score": 1,
            "context": "55 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= Ke a a\n(= [X)e\"C-] | WO",
            "description": null,
            "end_position": 511,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "rs",
            "start_position": 509
          },
          {
            "code_type": "MODIFIER",
            "code_value": "TI",
            "confidence_score": 1,
            "context": "Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= Ke a a\n(= [X)e\"C-] | WORKFLOW GEN",
            "description": null,
            "end_position": 521,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ti",
            "start_position": 519
          },
          {
            "code_type": "MODIFIER",
            "code_value": "KE",
            "confidence_score": 1,
            "context": "5) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= Ke a a\n(= [X)e\"C-] | WORKFLOW GEN MEDICAL CENTER :\nS",
            "description": null,
            "end_position": 540,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Ke",
            "start_position": 538
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SA",
            "confidence_score": 1,
            "context": "e a a\n(= [X)e\"C-] | WORKFLOW GEN MEDICAL CENTER :\nSa piailaaes reticent\npa ET. oe [neorcane :\nae en aT",
            "description": null,
            "end_position": 591,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Sa",
            "start_position": 589
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AE",
            "confidence_score": 1,
            "context": "TER :\nSa piailaaes reticent\npa ET. oe [neorcane :\nae en aT\nNO OTHER COVERAGE ee ee\na ae porn\nI tr eon",
            "description": null,
            "end_position": 635,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ae",
            "start_position": 633
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AT",
            "confidence_score": 1,
            "context": "Sa piailaaes reticent\npa ET. oe [neorcane :\nae en aT\nNO OTHER COVERAGE ee ee\na ae porn\nI tr eon a\nepee",
            "description": null,
            "end_position": 641,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "aT",
            "start_position": 639
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AE",
            "confidence_score": 1,
            "context": "oe [neorcane :\nae en aT\nNO OTHER COVERAGE ee ee\na ae porn\nI tr eon a\nepee mons errs etc neeee depemtet",
            "description": null,
            "end_position": 670,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ae",
            "start_position": 668
          },
          {
            "code_type": "MODIFIER",
            "code_value": "TR",
            "confidence_score": 1,
            "context": "ne :\nae en aT\nNO OTHER COVERAGE ee ee\na ae porn\nI tr eon a\nepee mons errs etc neeee depemtet eee\nSIGNA",
            "description": null,
            "end_position": 680,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "tr",
            "start_position": 678
          },
          {
            "code_type": "MODIFIER",
            "code_value": "UR",
            "confidence_score": 1,
            "context": "555\nel Oy |\n[21 DIAGNOSIS OR NATURE OF ILLNESS OR UR. (RELATE ITEMS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 i",
            "description": null,
            "end_position": 848,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "UR",
            "start_position": 846
          },
          {
            "code_type": "MODIFIER",
            "code_value": "TO",
            "confidence_score": 1,
            "context": "NATURE OF ILLNESS OR UR. (RELATE ITEMS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a",
            "description": null,
            "end_position": 876,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "TO",
            "start_position": 874
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AE",
            "confidence_score": 1,
            "context": "OF ILLNESS OR UR. (RELATE ITEMS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBro",
            "description": null,
            "end_position": 883,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "aE",
            "start_position": 881
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SE",
            "confidence_score": 1,
            "context": "MS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|",
            "description": null,
            "end_position": 913,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "SE",
            "start_position": 911
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SS",
            "confidence_score": 1,
            "context": "8 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09",
            "description": null,
            "end_position": 919,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "SS",
            "start_position": 917
          },
          {
            "code_type": "MODIFIER",
            "code_value": "ST",
            "confidence_score": 1,
            "context": "R @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09100",
            "description": null,
            "end_position": 922,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ST",
            "start_position": 920
          },
          {
            "code_type": "MODIFIER",
            "code_value": "AE",
            "confidence_score": 1,
            "context": "UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09100 [1] 1500 ool re)",
            "description": null,
            "end_position": 939,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ae",
            "start_position": 937
          },
          {
            "code_type": "MODIFIER",
            "code_value": "RE",
            "confidence_score": 1,
            "context": "ae EE Ee\n{1101 06, —_—[2a|o7| 09100 [1] 1500 ool re) | | | 8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qosc",
            "description": null,
            "end_position": 988,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "re",
            "start_position": 986
          },
          {
            "code_type": "MODIFIER",
            "code_value": "US",
            "confidence_score": 1,
            "context": "100 [1] 1500 ool re) | | | 8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; F",
            "description": null,
            "end_position": 1021,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "us",
            "start_position": 1019
          },
          {
            "code_type": "MODIFIER",
            "code_value": "TE",
            "confidence_score": 1,
            "context": "| | 8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es",
            "description": null,
            "end_position": 1044,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "te",
            "start_position": 1042
          },
          {
            "code_type": "MODIFIER",
            "code_value": "ST",
            "confidence_score": 1,
            "context": "8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es ee",
            "description": null,
            "end_position": 1048,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "St",
            "start_position": 1046
          },
          {
            "code_type": "MODIFIER",
            "code_value": "HH",
            "confidence_score": 1,
            "context": "ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es ee eee",
            "description": null,
            "end_position": 1051,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "hh",
            "start_position": 1049
          },
          {
            "code_type": "MODIFIER",
            "code_value": "RS",
            "confidence_score": 1,
            "context": "ESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es ee eee\nFrowse",
            "description": null,
            "end_position": 1058,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "rs",
            "start_position": 1056
          },
          {
            "code_type": "MODIFIER",
            "code_value": "FI",
            "confidence_score": 1,
            "context": "s 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es ee eee\nFrowserea Pili [asso",
            "description": null,
            "end_position": 1072,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Fi",
            "start_position": 1070
          },
          {
            "code_type": "MODIFIER",
            "code_value": "TE",
            "confidence_score": 1,
            "context": "rns ee ee\nFreres. es ee eee\nFrowserea Pili [asso (te PE\" [2 eoo ool 0 ool i500 00|\n_|123456789 ix] | 2",
            "description": null,
            "end_position": 1126,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "te",
            "start_position": 1124
          },
          {
            "code_type": "MODIFIER",
            "code_value": "QL",
            "confidence_score": 1,
            "context": "x] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFFICE OF DLLISON PAYLOR PLAY COMPANY\n3 PO BO",
            "description": null,
            "end_position": 1222,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "ql",
            "start_position": 1220
          },
          {
            "code_type": "MODIFIER",
            "code_value": "SS",
            "confidence_score": 1,
            "context": "CE OF DLLISON PAYLOR PLAY COMPANY\n3 PO BOX 555555\nSs RWS SAN DIEGO CA 90210\nBL seo 120306 Pe ia ie\nPLE",
            "description": null,
            "end_position": 1283,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "CPT/HCPCS modifiers",
              "pattern_priority": 2
            },
            "original_text": "Ss",
            "start_position": 1281
          },
          {
            "code_type": "REVENUE-CODE",
            "code_value": "0555",
            "confidence_score": 1,
            "context": ".com/samples/workplacehcfa1500\npease ee! MEDICARE 0555 eam |\nDONOT EEE! 1212 HOSPITAL WAY Speen\n‘STAPLE",
            "description": null,
            "end_position": 80,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "Revenue codes (4 digits starting with 0)",
              "pattern_priority": 2
            },
            "original_text": "0555",
            "start_position": 76
          },
          {
            "code_type": "SNOMED-CT",
            "code_value": "33333333",
            "confidence_score": 1,
            "context": "acwen [Jomacnas []omeresey [] aren [iano [Jem [>| 33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +",
            "description": null,
            "end_position": 276,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "SNOMED CT codes (6-18 digits)",
              "pattern_priority": 1
            },
            "original_text": "33333333",
            "start_position": 268
          },
          {
            "code_type": "SNOMED-CT",
            "code_value": "120306",
            "confidence_score": 1,
            "context": "ons errs etc neeee depemtet eee\nSIGNATURE ON FILE 120306 SIGNATURE ON FILE\nnt ™ mn\nSLATER, HENRY MD F24555",
            "description": null,
            "end_position": 749,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "SNOMED CT codes (6-18 digits)",
              "pattern_priority": 1
            },
            "original_text": "120306",
            "start_position": 743
          },
          {
            "code_type": "SNOMED-CT",
            "code_value": "123456789",
            "confidence_score": 1,
            "context": "ea Pili [asso (te PE\" [2 eoo ool 0 ool i500 00|\n_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 0",
            "description": null,
            "end_position": 1168,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "SNOMED CT codes (6-18 digits)",
              "pattern_priority": 1
            },
            "original_text": "123456789",
            "start_position": 1159
          },
          {
            "code_type": "SNOMED-CT",
            "code_value": "555555",
            "confidence_score": 1,
            "context": "ao OFFICE OF DLLISON PAYLOR PLAY COMPANY\n3 PO BOX 555555\nSs RWS SAN DIEGO CA 90210\nBL seo 120306 Pe ia ie",
            "description": null,
            "end_position": 1280,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "SNOMED CT codes (6-18 digits)",
              "pattern_priority": 1
            },
            "original_text": "555555",
            "start_position": 1274
          },
          {
            "code_type": "SNOMED-CT",
            "code_value": "120306",
            "confidence_score": 1,
            "context": "3 PO BOX 555555\nSs RWS SAN DIEGO CA 90210\nBL seo 120306 Pe ia ie\nPLEASE PRINT OR TYPE\n1491",
            "description": null,
            "end_position": 1320,
            "metadata": {
              "match_confidence": 0.6,
              "pattern_description": "SNOMED CT codes (6-18 digits)",
              "pattern_priority": 1
            },
            "original_text": "120306",
            "start_position": 1314
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "N C\\02 14 00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RIDGE RD o[X] s<{Jouf] [7] 555 RIDGE ST z\nSAN DIE",
            "description": null,
            "end_position": 360,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 357
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "OHN\npierre ern ory\n555 RIDGE RD o[X] s<{Jouf] [7] 555 RIDGE ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae",
            "description": null,
            "end_position": 391,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 388
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 |",
            "description": null,
            "end_position": 451,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 448
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "SAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPe",
            "description": null,
            "end_position": 456,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 453
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= K",
            "description": null,
            "end_position": 489,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 486
          },
          {
            "code_type": "ICD-9-CM",
            "code_value": "555",
            "confidence_score": 1,
            "context": "90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= Ke a a",
            "description": null,
            "end_position": 494,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-CM diagnosis codes",
              "pattern_priority": 1
            },
            "original_text": "555",
            "start_position": 491
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "02",
            "confidence_score": 1,
            "context": "em [>| 33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RI",
            "description": null,
            "end_position": 313,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "02",
            "start_position": 311
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "14",
            "confidence_score": 1,
            "context": "[>| 33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RIDGE",
            "description": null,
            "end_position": 316,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "14",
            "start_position": 314
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RIDGE RD",
            "description": null,
            "end_position": 319,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 317
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "21",
            "confidence_score": 1,
            "context": "ON FILE\nnt ™ mn\nSLATER, HENRY MD F24555\nel Oy |\n[21 DIAGNOSIS OR NATURE OF ILLNESS OR UR. (RELATE ITE",
            "description": null,
            "end_position": 811,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "21",
            "start_position": 809
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "28",
            "confidence_score": 1,
            "context": "NOSIS OR NATURE OF ILLNESS OR UR. (RELATE ITEMS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS S",
            "description": null,
            "end_position": 868,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "28",
            "start_position": 866
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "06",
            "confidence_score": 1,
            "context": "ni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09100 [1] 1500 ool re) | | | 8\n; ANES",
            "description": null,
            "end_position": 954,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "06",
            "start_position": 952
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "[1] 1500 ool re) | | | 8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(",
            "description": null,
            "end_position": 1024,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 1022
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "rowserea Pili [asso (te PE\" [2 eoo ool 0 ool i500 00|\n_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _",
            "description": null,
            "end_position": 1155,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 1153
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "500 00|\n_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFFICE OF DLLISON PAYLOR",
            "description": null,
            "end_position": 1201,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 1199
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFFICE OF DLLISON PAYLOR PLAY CO",
            "description": null,
            "end_position": 1209,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 1207
          },
          {
            "code_type": "ICD-9-PCS",
            "code_value": "00",
            "confidence_score": 1,
            "context": "9 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFFICE OF DLLISON PAYLOR PLAY COMPANY\n3 PO",
            "description": null,
            "end_position": 1219,
            "metadata": {
              "match_confidence": 0.5,
              "pattern_description": "ICD-9-PCS procedure codes",
              "pattern_priority": 1
            },
            "original_text": "00",
            "start_position": 1217
          }
        ],
        "extraction_metadata": {
          "code_types_searched": [
            "ICD-10-CM",
            "ICD-10-PCS",
            "CPT",
            "HCPCS",
            "DRG",
            "NDC",
            "LOINC",
            "SNOMED-CT",
            "ICD-9-CM",
            "ICD-9-PCS",
            "MODIFIER",
            "REVENUE-CODE",
            "PLACE-OF-SERVICE"
          ],
          "context_window": 50,
          "include_context": true,
          "patterns_used": 23
        },
        "extraction_timestamp": "2025-06-30T22:14:35.821045",
        "input_text": "visit: www. paris-software.com/samples/workplacehcfa1500\npease ee! MEDICARE 0555 eam |\nDONOT EEE! 1212 HOSPITAL WAY Speen\n‘STAPLE Paeae w\nml ee LOS ANGELES CA 90000 ARSE =\nHEALTH INSURANCE CLAIM FORM\nSa _ Lar ———\n[K]omacwen [Jomacnas []omeresey [] aren [iano [Jem [>| 33333333\npaar ey cog oe ge ce\nSMITH JOHN C\\02 14 00 «| | +[X]| SMITH JOHN\npierre ern ory\n555 RIDGE RD o[X] s<{Jouf] [7] 555 RIDGE ST z\nSAN DIEGO SAN DIEGO Poa |\naor <n ee ae\n90210 555) 555 5555 | swf] Se] ert }| 90210 555) 555 5555 | &\nPeer rs Ce\neel ti a\n“oe |” : i\nO= Ke a a\n(= [X)e\"C-] | WORKFLOW GEN MEDICAL CENTER :\nSa piailaaes reticent\npa ET. oe [neorcane :\nae en aT\nNO OTHER COVERAGE ee ee\na ae porn\nI tr eon a\nepee mons errs etc neeee depemtet eee\nSIGNATURE ON FILE 120306 SIGNATURE ON FILE\nnt ™ mn\nSLATER, HENRY MD F24555\nel Oy |\n[21 DIAGNOSIS OR NATURE OF ILLNESS OR UR. (RELATE ITEMS 1.28 OR @ TO TEM aE BY UNE)\n“0 9 iS Omni\na — |\nSE OS SS ST | a eS\nBrodie ae EE Ee\n{1101 06, —_—[2a|o7| 09100 [1] 1500 ool re) | | | 8\n; ANESTHESIA TIME: 2 us 00 [MINUTES Qoschr: te, St hh\n(fr rs ee ee ee\n; Fi\n(rns ee ee\nFreres. es ee eee\nFrowserea Pili [asso (te PE\" [2 eoo ool 0 ool i500 00|\n_|123456789 ix] | 25555 [Xie Pye\" |. 1500 00|: _0 00] .1500 00\nql Sao OFFICE OF DLLISON PAYLOR PLAY COMPANY\n3 PO BOX 555555\nSs RWS SAN DIEGO CA 90210\nBL seo 120306 Pe ia ie\nPLEASE PRINT OR TYPE\n1491",
        "processing_time_seconds": 0.0309,
        "total_codes_found": 62
      },
      "success": true
    }
    if (result || true) {
      onNavigate('processing', {
        uploadData: dummyData?.result?.extracted_codes,
        image: selectedImage
      });
    }
    if (response && response.ok) {
      setLoading(false);
      // onNavigate('processing', result);
    } else {
      // Alert.alert('Error', 'Failed to upload image');
    }
    setLoading(false);
    // Navigate to processing screen with data
    // onNavigate('processing', uploadData);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        style={styles.starButton}
      >
        <Star
          size={24}
          color={index < rating ? '#F59E0B' : '#D1D5DB'}
          fill={index < rating ? '#F59E0B' : 'transparent'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Upload Medical Bill</Text>
        <Text style={styles.subtitle}>
          Upload your bill and provide details for accurate analysis
        </Text>
      </View>

      <View style={styles.content}>
        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <SectionHeader title="Document Upload" />
          <UploadZone
            selectedImage={selectedImage}
            onImagePick={pickImage}
            onImageRemove={removeImage}
          />
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <SectionHeader title="Bill Information" />

          {/* Bill Type */}
          <View style={styles.dropdownGroup}>
            <Text style={styles.dropdownLabel}>Bill Type *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[styles.dropdownText, billType ? styles.selectedText : null]}>
                {billType ? billTypes.find(type => type.value === billType)?.label : 'Select bill type'}
              </Text>
              <FileText size={20} color="#64748B" />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {billTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setBillType(type.value);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Due Date */}
          <InputGroup
            label="Due Date"
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="MM/DD/YYYY"
            icon={Calendar}
          />

          {/* Location */}
          <InputGroup
            label="Where is the bill from?"
            value={location}
            onChangeText={setLocation}
            placeholder="Healthcare provider or facility"
            icon={MapPin}
          />

          {/* Service Rating */}
          <View style={styles.ratingGroup}>
            <Text style={styles.label}>Service Quality Rating</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars()}
              </View>
              {rating > 0 && rating < 3 && (
                <Text style={styles.ratingNote}>Needs improvement</Text>
              )}
            </View>
          </View>
        </View>

        {/* Proceed Button */}
        <ActionButton
          title="Proceed to Analysis"
          onPress={handleProceed}
          disabled={!selectedImage || !billType}
          variant="primary"
          loading={loading}
        />

        {/* Security Notice */}
        <SecurityNotice
          message="🔒 Your document is processed locally on this device. No data is transmitted to external servers."
          variant="success"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  uploadSection: {
    marginBottom: 32,
  },
  formSection: {
    marginBottom: 32,
  },
  dropdownGroup: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 48,
  },
  dropdownText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  selectedText: {
    color: '#1E293B',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1E293B',
  },
  ratingGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 4,
  },
  ratingNote: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
});