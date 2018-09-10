import * as React from "react";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
const { height, width } = Dimensions.get("window");

interface IMbtiInfoProps {
  mbti: string;
}

export default class MbtiInfo extends React.Component<IMbtiInfoProps, {}> {
  constructor(props: IMbtiInfoProps) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.infoBox}>
        <Text style={globalStyle.title}>About {this.props.mbti}</Text>
        {this.getMBTIinfo(this.props.mbti)}
      </ScrollView>
    );
  }

  getMBTIinfo = (mbti: string) => {
    switch (mbti) {
      // Analysts
      case "INTJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            INTJs form just two percent of the population, and women of this
            personality type are especially rare, forming just 0.8% of the
            population – it is often a challenge for them to find like-minded
            individuals who are able to keep up with their relentless
            intellectualism and chess-like maneuvering. People with the INTJ
            personality type are imaginative yet decisive, ambitious yet
            private.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [T]: Thinking
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "INTP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            INTPs pride themselves on their inventiveness and creativity, their
            unique perspective and vigorous intellect. Usually known as the
            philosopher, the architect, or the dreamy professor, INTPs have been
            responsible for many scientific discoveries throughout history. [
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [T]: Thinking
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      case "ENTJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ENTJs are natural-born leaders. People with this personality type
            embody the gifts of charisma and confidence, and project authority
            in a way that draws crowds together behind a common goal. But unlike
            their Feeling (F) counterpart, ENTJs are characterized by an often
            ruthless level of rationality, using their drive, determination and
            sharp minds.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [T]: Thinking
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "ENTP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            The ENTP personality type is the ultimate devil’s advocate, thriving
            on the process of shredding arguments and beliefs and letting the
            ribbons drift in the wind for all to see. Unlike their more
            determined Judging (J) counterparts, ENTPs don’t do this because
            they are trying to achieve some deeper purpose or strategic goal,
            but for the simple reason that it’s fun.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [T]: Thinking
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      // Diplomats
      case "INFJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            INFJs are not idle dreamers, but people capable of taking concrete
            steps to realize their goals and make a lasting positive impact.
            INFJs tend to see helping others as their purpose in life, but while
            people with this personality type can be found engaging rescue
            efforts and doing charity work, their real passion is to get to the
            heart of the issue so that people need not be rescued at all.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [F]: Feeling
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "INFP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            INFPs are guided by their principles, rather than by logic
            (Analysts), excitement (Explorers), or practicality (Sentinels).
            When deciding how to move forward, they will look to honor, beauty,
            morality and virtue – INFPs are led by the purity of their intent,
            not rewards and punishments. People who share the INFP personality
            type are proud of this quality.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [F]: Feeling
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      case "ENFJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ENFJs are natural-born leaders, full of passion and charisma.
            Forming around two percent of the population, they are oftentimes
            our politicians, our coaches and our teachers, reaching out and
            inspiring others to achieve and to do good in the world. With a
            natural confidence that begets influence, ENFJs take a great deal of
            pride and joy in guiding others to work together to improve
            themselves and their community. [E]: [N]: [F]: [J]:
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [F]: Feeling
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "ENFP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            The ENFP personality is a true free spirit. They are often the life
            of the party, but unlike Explorers, they are less interested in the
            sheer excitement and pleasure of the moment than they are in
            enjoying the social and emotional connections they make with others.
            Charming, independent, energetic and compassionate, the 7% of the
            population that they comprise can certainly be felt in any crowd.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [N]: Intuition
            {"\n"}
            [F]: Feeling
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      // Sentinels
      case "ISTJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            The ISTJ personality type is thought to be the most abundant, making
            up around 13% of the population. TheirPeople with the ISTJ
            personality type enjoy taking responsibility for their actions, and
            take pride in the work they do – when working towards a goal, ISTJs
            hold back none of their time and energy completing each relevant
            task with accuracy and patience.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [T]: Thinking
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "ISFJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            The ISFJ personality type is quite unique, as many of their
            qualities defy the definition of their individual traits. Though
            possessing the Feeling (F) trait, ISFJs have excellent analytical
            abilities; though Introverted (I), they have well-developed people
            skills and robust social relationships; and though they are a
            Judging (J) type, ISFJs are often receptive to change.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [F]: Feeling
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "ESTJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ESTJs are representatives of tradition and order, utilizing their
            understanding of what is right, wrong and socially acceptable to
            bring families and communities together. Embracing the values of
            honesty, dedication and dignity, people with the ESTJ personality
            type are valued for their clear advice and guidance.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [T]: Thinking
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      case "ESFJ":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            People who share the ESFJ personality type are, for lack of a better
            word, popular – which makes sense, given that it is also a very
            common personality type, making up twelve percent of the population.
            In high school, ESFJs are the cheerleaders and the quarterbacks,
            setting the tone, taking the spotlight and leading their teams
            forward to victory and fame.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [F]: Feeling
            {"\n"}
            [J]: Judgment
            {"\n"}
          </Text>
        );

      // Explorers
      case "ISTP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ISTPs love to explore with their hands and their eyes, touching and
            examining the world around them with cool rationalism and spirited
            curiosity. People with this personality type are natural Makers,
            moving from project to project, building the useful and the
            superfluous for the fun of it, and learning from their environment
            as they go.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [T]: Thinking
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      case "ISFP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ISFP personality types are true artists, but not necessarily in the
            typical sense where they’re out painting happy little trees. Often
            enough though, they are perfectly capable of this. Rather, it’s that
            they use aesthetics, design and even their choices and actions to
            push the limits of social convention.
            {"\n"}
            {"\n"}
            {"\n"}
            [I]: Introversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [F]:Feeling
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      case "ESTP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ESTP personality types always have an impact on their immediate
            surroundings – the best way to spot them at a party is to look for
            the whirling eddy of people flitting about them as they move from
            group to group. Laughing and entertaining with a blunt and earthy
            humor, ESTP personalities love to be the center of attention.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [T]: Thinking
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      case "ESFP":
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            ESFPs get caught up in the excitement of the moment, and want
            everyone else to feel that way, too. No other personality type is as
            generous with their time and energy as ESFPs when it comes to
            encouraging others, and no other personality type does it with such
            irresistible style.
            {"\n"}
            {"\n"}
            {"\n"}
            [E]: Extraversion
            {"\n"}
            [S]: Sensing
            {"\n"}
            [F]: Feeling
            {"\n"}
            [P]: Perception
            {"\n"}
          </Text>
        );

      default:
        return (
          <Text style={styles.question}>
            {"\n"}
            {"\n"}
            Personality is just one of many factors that guide our behavior,
            however. Our actions are also influenced by our environment, our
            experiences, and our individual goals. On our website, we describe
            how people belonging to a specific personality type are likely to
            behave. We outline indicators and tendencies, however, not
            definitive guidelines or answers.
          </Text>
        );
    }
  };
}

const styles = StyleSheet.create({
  infoBox: {
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.6,
    marginTop: 40
  },
  attribute: {
    flexDirection: "column",
    marginBottom: 15
  },
  question: {
    fontSize: 16,
    color: "#30519B",
    marginBottom: 10,
    textAlign: "justify"
  }
});
