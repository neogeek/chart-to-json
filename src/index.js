const CHART_SECTION_PATTERN = /\[([a-z]+)\]\s+\{([^\}]+)\}/i;

const CHART_SECTION_LINE_PATTERN = /([^=]+)\s*=([^\r\n]+)/gi;

const JSON_VALUE_PATTERN = /("[^"]+"|\S+)/gi;

const Difficulty = Object.freeze({
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
  Expert: 'Expert',
});

const parseSectionsFromChart = (contents) =>
  contents
    .match(new RegExp(CHART_SECTION_PATTERN, 'gi'))
    ?.reduce((prev, curr) => {
      const [, name, lines] = curr.match(CHART_SECTION_PATTERN) || [];

      return {
        ...prev,
        [name.trim()]: (
          lines.trim().match(CHART_SECTION_LINE_PATTERN) || []
        ).map((line) => {
          var [key, value] = line.trim().split(/\s*=\s*/);

          return {
            key,
            values: value
              .match(JSON_VALUE_PATTERN)
              .map((value) => value.replace(/^"|"$/g, '')),
          };
        }),
      };
    }, {});

const chartToJson = (contents) => {
  const sections = parseSectionsFromChart(contents);

  const song = sections['Song'].reduce(
    (prev, curr) => ({
      ...prev,
      [curr.key]: curr.values,
    }),
    {}
  );

  return {
    Name: song['Name'][0],
    Artist: song['Artist'][0],
    Album: song['Album'][0],
    Genre: song['Genre'][0],
    Year: song['Year'][0],
    Charter: song['Charter'][0],
    Resolution: parseInt(song['Resolution'][0]),
    Difficulty: parseInt(song['Difficulty'][0]),
    Offset: parseFloat(song['Offset'][0]),
    PreviewStart: parseFloat(song['PreviewStart'][0]),
    PreviewEnd: parseFloat(song['PreviewEnd'][0]),
    MusicStream: song['MusicStream'][0],
    Lyrics: sections['Events']
      .filter(
        (item) =>
          item.values[0] === 'E' &&
          item.values.length === 2 &&
          item.values[1].match(/^lyric\s+/i)
      )
      .reduce(
        (prev, curr) => ({
          ...prev,
          [curr.key]: curr.values[1].replace(/^lyric\s+/i, ''),
        }),
        {}
      ),
    Difficulties: Object.keys(Difficulty)
      .filter((difficulty) => sections[`${difficulty}Single`])
      .reduce(
        (prev, difficulty) => ({
          ...prev,
          [difficulty]: sections[`${difficulty}Single`]
            .filter(
              (item) => item.values.length === 3 && item.values[0] === 'N'
            )
            .map((item) => ({
              Position: parseInt(item.key, 10),
              HandPosition: parseInt(item.values[1]),
              Length: parseInt(item.values[2]),
            })),
        }),
        {}
      ),
    BPM: sections['SyncTrack']
      .filter((item) => item.values[0] === 'B')
      .reduce(
        (prev, curr) => ({
          ...prev,
          [curr.key]: parseInt(curr.values[1], 10),
        }),
        {}
      ),
    TimeSignatures: sections['SyncTrack']
      .filter((item) => item.values[0] === 'TS')
      .reduce(
        (prev, curr) => ({
          ...prev,
          [curr.key]: curr.values.slice(1).map((value) => parseInt(value, 10)),
        }),
        {}
      ),
  };
};

module.exports = chartToJson;
