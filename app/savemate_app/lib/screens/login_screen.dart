import 'package:flutter/material.dart';
import 'package:savemate_app/screens/register_screen.dart';
import 'package:savemate_app/screens/component/main_nav_wrapper.dart';
import 'package:savemate_app/services/auth_service.dart';
import 'package:savemate_app/utils/secure_storage.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String? errorMsg;

  Future<void> login() async {
    print('🔐 Attempting login...');
    final res = await AuthService.login(
      _emailController.text,
      _passwordController.text,
    );
    print('🧾 Response: $res');

    if (res['statusCode'] == 200) {
      print('✅ Login successful, saving token...');
      await SecureStorage.saveToken(res['body']['token']);
      print('➡️ Redirecting to dashboard...');
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => MainNavWrapper(
            userName: res['body']['user']['name'],
            userId: res['body']['user']['id'],
          ),
        ),
      );
    } else {
      print('❌ Login failed: ${res['body']['message']}');
      setState(() => errorMsg = res['body']['message'] ?? 'Login failed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 60.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Column(
                  children: [
                    Icon(
                      Icons.account_balance_wallet_rounded,
                      size: 80,
                      color: Colors.green[700],
                    ),
                    SizedBox(height: 12),
                    Text(
                      'SaveMate',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.green[800],
                      ),
                    ),
                    SizedBox(height: 4),
                    Text('Welcome back 👋', style: TextStyle(fontSize: 16)),
                  ],
                ),
              ),
              SizedBox(height: 40),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.email),
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.lock),
                  labelText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
              SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green[700],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onPressed: login,
                  child: Text(
                    'Login',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              SizedBox(height: 20),
              Center(
                child: GestureDetector(
                  onTap:
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => RegisterScreen()),
                      ),
                  child: Text(
                    "Don't have an account? Register here",
                    style: TextStyle(
                      color: Colors.green[800],
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ),
              if (errorMsg != null) ...[
                SizedBox(height: 20),
                Center(
                  child: Text(errorMsg!, style: TextStyle(color: Colors.red)),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
