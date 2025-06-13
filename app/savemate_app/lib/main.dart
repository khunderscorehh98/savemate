import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'package:http/http.dart' as http;
import 'utils/constants.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await testConnection();
  runApp(const SaveMateApp());
}

Future<void> testConnection() async {
  try {
    final res = await http.get(Uri.parse('$apiBaseUrl/'));
    print('✅ API says: \${res.statusCode} - \${res.body}');
  } catch (e) {
    print('❌ Error connecting to API: \$e');
  }
}

class SaveMateApp extends StatelessWidget {
  const SaveMateApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SaveMate',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
      ),
      home: LoginScreen(),
    );
  }
}
